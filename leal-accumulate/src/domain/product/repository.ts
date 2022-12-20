import { ProductInfo } from '../../types';
import { ProductEntity } from './entity';

export interface ProductRepository {
  findProductById(uuid: string): Promise<ProductEntity>;
  registerProduct(product: ProductInfo): Promise<ProductEntity>;
  listProduct(): Promise<ProductEntity[]>;
  buy(uuid: string, clientId: string): Promise<void>;
}
