import { v4 as uuidv4 } from 'uuid';
import { ClientEntity } from './entity';

export class ClientValue implements ClientEntity {
  public readonly uuid: string;
  public name: string;
  public email: string;
  public points: number;

  constructor({
    name,
    email,
    uuid,
    points = 0,
  }: {
    uuid?: string;
    name: string;
    email: string;
    points?: number | string;
  }) {
    this.uuid = uuid || uuidv4();
    this.name = name;
    this.email = email;
    this.points = typeof points === 'number' ? points : parseInt(points);
  }
}
