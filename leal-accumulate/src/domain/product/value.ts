import { v4 as uuid } from 'uuid';
import { ProductEntity } from './entity';

export class ProductValue implements ProductEntity {
  public readonly uuid: string;
  public name: string;
  public value: number;
  public points: number;

  constructor({ name, value, points }: { name: string; value: number; points: number }) {
    this.uuid = uuid();
    this.name = name;
    this.value = value;
    this.points = points;
  }
}
