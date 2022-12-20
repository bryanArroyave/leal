import express, { Application } from 'express';
import cors from 'cors';

export default class App {
  private readonly app: Application;
  constructor({ routes, error404Middleware, errorMiddleware }) {
    this.app = express();
    this.config({
      routes,
      error404Middleware,
      errorMiddleware,
    });
  }

  config(data: any): void {
    // const sentry = new SentryMiddleware(this.app);
    this.app.use(express.json({ limit: '25mb' }));

    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cors({ origin: '*' }));

    this.app.use('/api/v1', data.routes);

    // this.app.use(sentry.errorHandler());
    this.app.use(data.error404Middleware.handle.bind(data.error404Middleware));
    this.app.use(data.errorMiddleware.handle.bind(data.errorMiddleware));
  }

  get instance(): Application {
    return this.app;
  }
}
