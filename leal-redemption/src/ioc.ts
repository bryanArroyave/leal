import { asClass, createContainer, asFunction, asValue } from 'awilix';
import { GiftUseCase } from './application/gift/giftUseCase';
import ErrorMiddleware from './infraestructure/middlewares/error.mid';
import Error404Middleware from './infraestructure/middlewares/error404.mid';
import { MockRepository } from './infraestructure/repository/gift/mock.repository';
import Routes from './routes';
import GiftRoutes from './infraestructure/route/gift.route';
import Server from './server';
import App from './app';
import { GiftController } from './infraestructure/controller/gift.controller';
import RabbitMQMessageBroker from './infraestructure/repository/messageBroker/rabbitMQ/rabbitMQ.repository';
import RabbitMQChannelsConfig from './infraestructure/repository/messageBroker/rabbitMQ/channelsConfig';
import RabbitMQMessageBrokerHandlers from './infraestructure/repository/messageBroker/rabbitMQ/handles';

const getGiftRepository = (env: string) => {
  const repositories = {
    test: MockRepository,
  };
  return repositories[env] || MockRepository;
};

const container = createContainer();

container
  .register({
    giftRepository: asClass(getGiftRepository(process.env.NODE_ENV)).singleton(),
    giftUseCase: asClass(GiftUseCase).singleton(),
    giftController: asClass(GiftController).singleton(),
    error404Middleware: asClass(Error404Middleware).singleton(),
    errorMiddleware: asClass(ErrorMiddleware).singleton(),
    giftRoutes: asFunction(GiftRoutes).singleton(),
    routes: asFunction(Routes).singleton(),
    server: asClass(Server).singleton(),
    app: asClass(App).singleton(),
  })
  .register({
    messageBroker: asClass(RabbitMQMessageBroker).singleton(),
    channelsConfig: asClass(RabbitMQChannelsConfig).singleton(),
    messageBrokerHandlers: asValue(RabbitMQMessageBrokerHandlers),
  });

export default container;
