import { v4 as uuid } from 'uuid';
import { GiftEntity } from './entity';

export class GiftValue implements GiftEntity {
  public readonly uuid: string;
  public name: string;
  public points: number;

  constructor({ name, points }: { name: string; points: number }) {
    this.uuid = uuid();
    this.name = name;
    this.points = points;
  }
}
