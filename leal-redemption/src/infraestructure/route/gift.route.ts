import { Router } from 'express';
import { GiftController } from '../controller/gift.controller';

const router: Router = Router();

export default function ({ giftController }: { giftController: GiftController }) {
  router.post('/', giftController.register.bind(giftController));
  router.post('/:giftId/exchange', giftController.exchange.bind(giftController));
  router.get('/', giftController.list.bind(giftController));
  router.get('/:uuid', giftController.findById.bind(giftController));

  return router;
}
