export abstract class DbConnection {
  private connection: any;

  abstract connect(): Promise<any>;

  protected setConnection(connection: any): void {
    this.connection = connection;
  }
  protected getConnection(): any {
    return this.connection;
  }
}
