import { DbConnection } from '../../../../domain/db/entity';

export default class MockConnection extends DbConnection {
  connect() {
    return Promise.resolve({});
  }
}
