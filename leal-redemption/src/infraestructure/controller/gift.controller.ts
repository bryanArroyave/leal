import { Request, Response, NextFunction } from 'express';
import { GiftUseCase } from '../../application/gift/giftUseCase';

export class GiftController {
  private giftUseCase: GiftUseCase;
  constructor({ giftUseCase }) {
    this.giftUseCase = giftUseCase;
  }

  public async findById({ params }: Request, res: Response, next: NextFunction) {
    try {
      const { uuid } = params;
      const payload = await this.giftUseCase.findGiftById(uuid);
      return res.send({ payload });
    } catch (error) {
      next(error);
    }
  }

  public async list(_req: Request, res: Response, next: NextFunction) {
    try {
      const payload = await this.giftUseCase.listGift();
      return res.send({ payload });
    } catch (error) {
      next(error);
    }
  }

  public async register({ body }: Request, res: Response, next: NextFunction) {
    try {
      const { name, points } = body;
      const payload = await this.giftUseCase.registerGift({ name, points });
      return res.send({ payload });
    } catch (error) {
      next(error);
    }
  }

  public async exchange({ params, body, headers }: Request, res: Response, next: NextFunction) {
    try {
      const { giftId } = params;
      const { clientId } = body;
      const { socketid } = headers;
      const payload = await this.giftUseCase.exchange(giftId, clientId, socketid);
      return res.send({ payload });
    } catch (error) {
      next(error);
    }
  }
}
