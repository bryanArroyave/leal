import { Router } from 'express';
import { ProductController } from '../controller/product.controller';

const router: Router = Router();

export default function ({ productController }: { productController: ProductController }) {
  router.post('/', productController.register.bind(productController));
  router.post('/:productId/buy', productController.buy.bind(productController));
  router.get('/', productController.list.bind(productController));
  router.get('/:uuid', productController.findById.bind(productController));

  return router;
}
