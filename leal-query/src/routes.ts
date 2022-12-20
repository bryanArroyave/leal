import { Router } from 'express';

export default function ({ clientRoutes }) {
  const router = Router();

  router.use('/client', clientRoutes);
  return router;
}
