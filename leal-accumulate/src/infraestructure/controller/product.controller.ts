import { Request, Response, NextFunction } from 'express';
import { ProductUseCase } from '../../application/product/productUseCase';

export class ProductController {
  private productUseCase: ProductUseCase;
  constructor({ productUseCase }) {
    this.productUseCase = productUseCase;
  }

  public async findById({ params }: Request, res: Response, next: NextFunction) {
    try {
      const { uuid } = params;
      const payload = await this.productUseCase.findProductById(uuid);
      return res.send({ payload });
    } catch (error) {
      next(error);
    }
  }

  public async list(_req: Request, res: Response, next: NextFunction) {
    try {
      const payload = await this.productUseCase.listProduct();
      return res.send({ payload });
    } catch (error) {
      next(error);
    }
  }

  public async register({ body }: Request, res: Response, next: NextFunction) {
    try {
      const { name, points, value } = body;
      const payload = await this.productUseCase.registerProduct({ name, points, value });
      return res.send({ payload });
    } catch (error) {
      next(error);
    }
  }

  public async buy({ params, body, headers }: Request, res: Response, next: NextFunction) {
    try {
      const { productId } = params;
      const { clientId } = body;
      const { socketid } = headers;
      const payload = await this.productUseCase.buy(productId, clientId, socketid);
      return res.send({ payload });
    } catch (error) {
      next(error);
    }
  }
}
