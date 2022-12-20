import { ClientEntity } from '../../domain/client/entity';
import { ClientRepository } from '../../domain/client/repository';
import { ClientInfo } from '../../types';

export class ClientUseCase {
  private readonly clientRepository: ClientRepository;
  constructor({ clientRepository }) {
    this.clientRepository = clientRepository;
  }

  async findClientById(uuid: string): Promise<ClientEntity> {
    const client = await this.clientRepository.findClientById(uuid);
    if (!client) {
      const error: any = new Error('CLiente no encontrado');
      error.status = 404;
      throw error;
    }
    return client;
  }
  async registerClient(client: ClientInfo): Promise<ClientEntity> {
    return this.clientRepository.registerClient(client);
  }
  async listClient(): Promise<ClientEntity[]> {
    return this.clientRepository.listClient();
  }
  async getPoints(uuid: string): Promise<number> {
    return this.clientRepository.getPoints(uuid);
  }
  async addPoints(uuid: string, points: number): Promise<ClientEntity> {
    return this.clientRepository.addPoints(uuid, points);
  }
  async removePoints(uuid: string, points: number): Promise<ClientEntity> {
    return this.clientRepository.removePoints(uuid, points);
  }
}
