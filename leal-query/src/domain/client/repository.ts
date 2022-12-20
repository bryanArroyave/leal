import { ClientInfo } from '../../types';
import { DbConnection } from '../db/entity';
import { ClientEntity } from './entity';

export abstract class ClientRepository {
  public readonly connection: any;
  constructor(connection: DbConnection) {
    this.connection = connection;
  }

  abstract findClientById(uuid: string): Promise<ClientEntity>;
  abstract registerClient(user: ClientInfo): Promise<ClientEntity>;
  abstract listClient(): Promise<ClientEntity[]>;
  abstract getPoints(uuid: string): Promise<number>;
  abstract addPoints(uuid: string, points: number): Promise<ClientEntity>;
  abstract removePoints(uuid: string, points: number): Promise<ClientEntity>;
}
