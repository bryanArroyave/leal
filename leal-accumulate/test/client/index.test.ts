import { describe, expect, it } from '@jest/globals';
import { ProductUseCase } from '../../src/application/product/productUseCase';
import container from '../../src/ioc';

const productUseCase: ProductUseCase = container.resolve('productRepository');

describe('Describe', () => {
  it('it', async () => {
    const points = await productUseCase.getPoints('000-000');
    expect(points).toBe(200);
  });
});
