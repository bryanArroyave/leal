import { Router } from 'express';

export default function ({ productRoutes }) {
  const router = Router();

  router.use('/product', productRoutes);
  return router;
}
