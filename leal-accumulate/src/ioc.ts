import { asClass, createContainer, asFunction, asValue } from 'awilix';
import { ProductUseCase } from './application/product/productUseCase';
import ErrorMiddleware from './infraestructure/middlewares/error.mid';
import Error404Middleware from './infraestructure/middlewares/error404.mid';
import { MockRepository } from './infraestructure/repository/product/mock.repository';
import Routes from './routes';
import ProductRoutes from './infraestructure/route/product.route';
import Server from './server';
import App from './app';
import { ProductController } from './infraestructure/controller/product.controller';
import RabbitMQMessageBroker from './infraestructure/repository/messageBroker/rabbitMQ/rabbitMQ.repository';
import RabbitMQChannelsConfig from './infraestructure/repository/messageBroker/rabbitMQ/channelsConfig';
import RabbitMQMessageBrokerHandlers from './infraestructure/repository/messageBroker/rabbitMQ/handles';

const getProductRepository = (env: string) => {
  const repositories = {
    test: MockRepository,
  };
  return repositories[env] || MockRepository;
};

const container = createContainer();

container
  .register({
    productRepository: asClass(getProductRepository(process.env.NODE_ENV)).singleton(),
    productUseCase: asClass(ProductUseCase).singleton(),
    productController: asClass(ProductController).singleton(),
    error404Middleware: asClass(Error404Middleware).singleton(),
    errorMiddleware: asClass(ErrorMiddleware).singleton(),
    productRoutes: asFunction(ProductRoutes).singleton(),
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
