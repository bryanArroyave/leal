import { describe, expect, it } from '@jest/globals';
import { ClientUseCase } from '../../src/application/client/clientUseCase';
import container from '../../src/ioc';

const clientUseCase: ClientUseCase = container.resolve('clientUseCase');

describe('Test  Client (findClientById)', () => {
  it('An existing client should be get a response', async () => {
    const client = await clientUseCase.findClientById('000-000');
    expect(client.points).toBe(200);
    expect(client.email).toBe('bryanarroyaveo@gmail.com');
  });

  it('An inexisting client should throw an error', async () => {
    try {
      await clientUseCase.findClientById('000-0001');
    } catch (error: any) {
      expect(error.message).toBe('CLiente no encontrado');
      expect(error.status).toBe(404);
    }
  });
});

describe('Test  Client (listClient)', () => {
  it('should be have 2 clients', async () => {
    const clients = await clientUseCase.listClient();
    expect(clients.length).toBe(2);
  });
});

describe('Test  Client (getPoints)', () => {
  it('An existing client should be get points', async () => {
    const points = await clientUseCase.getPoints('000-001');
    expect(points).toBe(0);
  });
});

describe('Test  Client (addPoints)', () => {
  it('An existing client should add points', async () => {
    const client = await clientUseCase.addPoints('000-001', 200);
    expect(client.points).toBe(200);
  });
});
describe('Test  Client (removePoints)', () => {
  it('An existing client should add points', async () => {
    const client = await clientUseCase.removePoints('000-000', 50);
    expect(client.points).toBe(150);
  });
});
