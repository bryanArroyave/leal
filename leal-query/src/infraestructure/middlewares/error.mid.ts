import { NextFunction, Request, Response } from 'express';
export default class ErrorMiddleware {
  async handle(err: any, req: Request | any, res: Response, next: NextFunction) {
    const { stack, message } = err;
    console.error(err);
    req.error = { stack, message, status: err.status || req.statusCode || 500 };
    return res.status(req.error.status).json({
      msg: req.error.status === 500 ? `Se ha generado un error en el servidor` : req.error.message,
      ticket: req.uid,
      code: req.error.code,
    });
  }
}
