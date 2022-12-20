import { NextFunction, Request, Response } from 'express';

export default class Error404Middleware {
  handle(req: Request, res: Response, next: NextFunction): Promise<any> | void {
    if (req.url.includes('favicon.ico')) next();
    req.statusCode = 404;
    const error = new Error(`Ruta '[${req.method}] ${req.get('host')}${req.url}' No se encuentra registrada`);
    return next(error);
  }
}
