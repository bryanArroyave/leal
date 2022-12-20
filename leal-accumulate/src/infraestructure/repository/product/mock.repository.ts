import { ProductEntity } from '../../../domain/product/entity';
import { ProductRepository } from '../../../domain/product/repository';
import { ProductValue } from '../../../domain/product/value';
import { ProductInfo } from '../../../types';

const MOCK_PRODUCTS: ProductEntity[] = [
  {
    uuid: 'P1',
    name: 'Producto 1',
    value: 300,
    points: 200,
  },
  {
    uuid: 'P2',
    name: 'Producto 2',
    value: 600,
    points: 450,
  },
  {
    uuid: 'P3',
    name: 'Producto 1',
    value: 300,
    points: 200,
  },
  {
    uuid: 'P4',
    name: 'Producto 2',
    value: 600,
    points: 450,
  },
  {
    uuid: 'P5',
    name: 'Producto 1',
    value: 300,
    points: 200,
  },
  {
    uuid: 'P5',
    name: 'Producto 2',
    value: 600,
    points: 450,
  },
];

export class MockRepository implements ProductRepository {
  async buy(uuid: string, clientId: string): Promise<void> {
    await Promise.resolve(null);
  }
  async findProductById(uuid: string): Promise<ProductEntity> {
    return MOCK_PRODUCTS.find((product) => product.uuid === uuid);
  }

  async registerProduct(product: ProductEntity): Promise<ProductEntity> {
    const newProduct = new ProductValue(product);
    MOCK_PRODUCTS.push(newProduct);
    return newProduct;
  }

  async listProduct(): Promise<ProductEntity[]> {
    return MOCK_PRODUCTS;
  }
}
