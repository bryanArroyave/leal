import { describe, expect, it } from '@jest/globals';
import { GiftUseCase } from '../../src/application/gift/giftUseCase';
import container from '../../src/ioc';

const giftUseCase: GiftUseCase = container.resolve('giftRepository');

describe('Describe', () => {
  it('it', async () => {
    const points = await giftUseCase.getPoints('000-000');
    expect(points).toBe(200);
  });
});
