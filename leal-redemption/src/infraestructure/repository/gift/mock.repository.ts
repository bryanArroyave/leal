import { GiftEntity } from '../../../domain/gift/entity';
import { GiftRepository } from '../../../domain/gift/repository';
import { GiftValue } from '../../../domain/gift/value';

const MOCK_PRODUCTS: GiftEntity[] = [
  {
    uuid: 'G1',
    name: 'Regalo 1',
    points: 2000,
  },
  {
    uuid: 'G2',
    name: 'Regalo 2',
    points: 4511,
  },
];

export class MockRepository implements GiftRepository {
  async findGiftById(uuid: string): Promise<GiftEntity> {
    return MOCK_PRODUCTS.find((gift) => gift.uuid === uuid);
  }

  async registerGift(gift: GiftEntity): Promise<GiftEntity> {
    const newGift = new GiftValue(gift);
    MOCK_PRODUCTS.push(newGift);
    return newGift;
  }

  async listGift(): Promise<GiftEntity[]> {
    return MOCK_PRODUCTS;
  }
}
