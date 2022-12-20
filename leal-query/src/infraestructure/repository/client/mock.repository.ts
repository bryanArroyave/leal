import { ClientEntity } from '../../../domain/client/entity';
import { ClientRepository } from '../../../domain/client/repository';
import { ClientValue } from '../../../domain/client/value';

const MOCK_CLIENTS: ClientEntity[] = [
  {
    uuid: '000-000',
    name: 'Bryan Arroyave Ortiz',
    email: 'bryanarroyaveo@gmail.com',
    points: 200,
  },
  {
    uuid: '000-001',
    name: 'Juan José Aristizabal',
    email: 'juanjo@gmail.com',
    points: 0,
  },
];

export class MockRepository extends ClientRepository {
  constructor({ connection }) {
    super(connection);
  }

  async findClientById(uuid: string): Promise<ClientEntity> {
    return MOCK_CLIENTS.find((user) => user.uuid === uuid);
  }
  async registerClient(client: ClientEntity): Promise<ClientEntity> {
    const newClient = new ClientValue(client);
    MOCK_CLIENTS.push(newClient);
    return newClient;
  }
  async listClient(): Promise<ClientEntity[]> {
    return MOCK_CLIENTS;
  }
  async getPoints(uuid: string): Promise<number> {
    const user = await this.findClientById(uuid);
    return user.points;
  }

  async addPoints(uuid: string, points: number): Promise<ClientEntity> {
    const user = await this.findClientById(uuid);
    user.points = user.points + points;
    return user;
  }
  async removePoints(uuid: string, points: number): Promise<ClientEntity> {
    const user = await this.findClientById(uuid);
    if (user.points - points < 0) {
      const error: any = new Error('No puedes redimir esta cantidad de puntos');
      error.status = 400;
      throw error;
    }
    user.points = user.points - points;
    return user;
  }
}
