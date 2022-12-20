import { Request, Response, NextFunction } from 'express';
import { ClientUseCase } from '../../application/client/clientUseCase';

export class ClientController {
  private clientUseCase: ClientUseCase;
  constructor({ clientUseCase }) {
    this.clientUseCase = clientUseCase;
  }

  public async findById({ params }: Request, res: Response, next: NextFunction) {
    try {
      const { uuid } = params;
      const payload = await this.clientUseCase.findClientById(uuid);
      return res.send({ payload });
    } catch (error) {
      next(error);
    }
  }

  public async list(_req: Request, res: Response, next: NextFunction) {
    try {
      const payload = await this.clientUseCase.listClient();
      return res.send({ payload });
    } catch (error) {
      next(error);
    }
  }

  public async register({ body }: Request, res: Response, next: NextFunction) {
    try {
      const { name, email } = body;
      const payload = await this.clientUseCase.registerClient({ name, email });
      return res.send({ payload });
    } catch (error) {
      next(error);
    }
  }
}
