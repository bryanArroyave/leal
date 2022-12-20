import { asClass, createContainer, asFunction, asValue } from 'awilix';
import { ClientUseCase } from './application/client/clientUseCase';
import ErrorMiddleware from './infraestructure/middlewares/error.mid';
import Error404Middleware from './infraestructure/middlewares/error404.mid';
import { MockRepository } from './infraestructure/repository/client/mock.repository';
import Routes from './routes';
import ClientRoutes from './infraestructure/route/client.route';
import Server from './server';
import App from './app';
import { ClientController } from './infraestructure/controller/client.controller';
import RabbitMQMessageBroker from './infraestructure/repository/messageBroker/rabbitMQ/rabbitMQ.repository';
import RabbitMQChannelsConfig from './infraestructure/repository/messageBroker/rabbitMQ/channelsConfig';
import RabbitMQMessageBrokerHandlers from './infraestructure/repository/messageBroker/rabbitMQ/handles';
import Socket from './socket';
import DynamoConnection from './infraestructure/db/connection/dynamo/connection';
import MockConnection from './infraestructure/db/connection/mock/connection';
import { DynamoRepository } from './infraestructure/repository/client/dynamo.repository';
import dotenv from 'dotenv';
dotenv.config();

const getClientRepository = (env: string) => {
  const repositories = {
    dev: DynamoRepository,
    test: MockRepository,
  };
  return repositories[env] || MockRepository;
};
const getDBConnection = (env: any) => {
  const repositories = {
    dev: DynamoConnection,
    test: MockConnection,
  };
  console.log(env);
  return repositories[env] || MockConnection;
};

const container = createContainer();

container
  .register({
    error404Middleware: asClass(Error404Middleware).singleton(),
    errorMiddleware: asClass(ErrorMiddleware).singleton(),
    routes: asFunction(Routes).singleton(),
    server: asClass(Server).singleton(),
    app: asClass(App).singleton(),
  })
  .register({
    connection: asClass(getDBConnection(process.env.NODE_ENV)).singleton(),
  })
  .register({
    clientRepository: asClass(getClientRepository(process.env.NODE_ENV)).singleton(),
    clientUseCase: asClass(ClientUseCase).singleton(),
    clientController: asClass(ClientController).singleton(),
    clientRoutes: asFunction(ClientRoutes).singleton(),
  })
  .register({
    socket: asClass(Socket).singleton(),
    messageBroker: asClass(RabbitMQMessageBroker).singleton(),
    channelsConfig: asClass(RabbitMQChannelsConfig).singleton(),
    messageBrokerHandlers: asValue(RabbitMQMessageBrokerHandlers),
  });

export default container;
