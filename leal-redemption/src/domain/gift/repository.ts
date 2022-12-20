import { GiftInfo } from '../../types';
import { GiftEntity } from './entity';

export interface GiftRepository {
  findGiftById(uuid: string): Promise<GiftEntity>;
  registerGift(gift: GiftInfo): Promise<GiftEntity>;
  listGift(): Promise<GiftEntity[]>;
}
