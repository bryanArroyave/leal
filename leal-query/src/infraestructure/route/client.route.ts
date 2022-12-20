import { Router } from 'express';
import { ClientController } from '../controller/client.controller';

const router: Router = Router();

export default function ({ clientController }: { clientController: ClientController }) {
  router.post('/', clientController.register.bind(clientController));
  router.get('/', clientController.list.bind(clientController));
  router.get('/:uuid', clientController.findById.bind(clientController));

  return router;
}
