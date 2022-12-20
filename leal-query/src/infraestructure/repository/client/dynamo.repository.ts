import { ClientEntity } from '../../../domain/client/entity';
import { ClientRepository } from '../../../domain/client/repository';
import { ClientValue } from '../../../domain/client/value';

export class DynamoRepository extends ClientRepository {
  constructor({ connection }) {
    super(connection);
  }

  async findClientById(uuid: string): Promise<ClientEntity> {
    return new Promise((res, rej) => {
      const params = {
        TableName: 'Clients',
        Key: {
          uuid: { S: uuid },
        },
      };

      this.connection.getConnection().getItem(params, function (err, data: any) {
        if (err) {
          rej(err);
        } else {
          const asd = Object.keys(data.Item)?.reduce((acc: any, el2) => {
            acc[el2] = data.Item[el2]['S'] || data.Item[el2]['N'];
            return acc;
          }, {});
          res(new ClientValue(asd));
        }
      });
    });
  }
  async registerClient(client: ClientEntity): Promise<ClientEntity> {
    const newClient = new ClientValue(client);

    return new Promise((res, rej) => {
      const params = {
        TableName: 'Clients',
        Item: {
          uuid: { S: newClient.uuid },
          name: { S: newClient.name },
          email: { S: newClient.email },
          points: { N: '0' },
        },
      };

      this.connection.getConnection().putItem(params, function (err) {
        if (err) {
          rej(err);
        } else {
          res(newClient);
        }
      });
    });
  }
  async listClient(): Promise<ClientEntity[]> {
    const params = {
      TableName: 'Clients',
    };

    return new Promise((res, rej) => {
      this.connection.getConnection().scan(params, function (err, data) {
        if (err) {
          rej(err);
        } else {
          const items = data.Items || [];

          const els = items.map((el) => {
            return Object.keys(el).reduce((acc, el2) => {
              acc[el2] = el[el2]['S'] || el[el2]['N'];
              return acc;
            }, {});
          });

          res(els.map((el) => new ClientValue(el)));
        }
      });
    });
  }
  async getPoints(uuid: string): Promise<number> {
    const user = await this.findClientById(uuid);
    return user.points;
  }

  async addPoints(uuid: string, points: number): Promise<ClientEntity> {
    const client = await this.findClientById(uuid);
    client.points = client.points + points;

    return new Promise((res, rej) => {
      const params = {
        TableName: 'Clients',
        Item: {
          uuid: { S: uuid },
          points: { S: `${client.points}` },
          name: { S: `${client.name}` },
          email: { S: `${client.email}` },
        },
        ReturnConsumedCapacity: 'TOTAL',
      };

      this.connection.getConnection().putItem(params, function (err) {
        if (err) {
          rej(err);
        } else {
          res(client);
        }
      });
    });
  }
  async removePoints(uuid: string, points: number): Promise<ClientEntity> {
    const client = await this.findClientById(uuid);
    if (client.points - points < 0) {
      const error: any = new Error('No puedes redimir esta cantidad de puntos');
      error.status = 400;
      throw error;
    }
    client.points = client.points - points;
    return new Promise((res, rej) => {
      const params = {
        TableName: 'Clients',
        Item: {
          uuid: { S: uuid },
          points: { S: `${client.points}` },
          name: { S: `${client.name}` },
          email: { S: `${client.email}` },
        },
        ReturnConsumedCapacity: 'TOTAL',
      };

      this.connection.getConnection().putItem(params, function (err) {
        if (err) {
          rej(err);
        } else {
          res(client);
        }
      });
    });
  }
}
