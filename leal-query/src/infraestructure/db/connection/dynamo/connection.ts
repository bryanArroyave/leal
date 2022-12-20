import { DbConnection } from '../../../../domain/db/entity';
import AWS from 'aws-sdk';

export default class DynamoConnection extends DbConnection {
  connect() {
    return Promise.resolve(this.config());
  }

  config() {
    AWS.config.update({
      region: this.region,
      accessKeyId: this.accessKey,
      secretAccessKey: this.secrectAccessKey,
    });

    this.setConnection(new AWS.DynamoDB());
    this.createTable();
  }

  public createTable() {
    const params = {
      AttributeDefinitions: [
        {
          AttributeName: 'uuid',
          AttributeType: 'S',
        },
      ],
      KeySchema: [
        {
          AttributeName: 'uuid',
          KeyType: 'HASH',
        },
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1,
      },
      TableName: 'Clients',
      StreamSpecification: {
        StreamEnabled: false,
      },
    };

    this.getConnection()?.createTable(params, function (err, data) {
      if (err) {
        console.error('Unable to create table', err);
      } else {
        console.log('Created table', data);
      }
    });
  }

  get region() {
    return process.env.AWS_REGION;
  }

  get accessKey() {
    return process.env.AWS_ACCESS_KEY;
  }

  get secrectAccessKey() {
    return process.env.AWS_SECRET_ACCESS_KEY;
  }
}
