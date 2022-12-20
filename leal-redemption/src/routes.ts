import { Router } from 'express';

export default function ({ giftRoutes }) {
  const router = Router();

  router.use('/gift', giftRoutes);
  return router;
}
