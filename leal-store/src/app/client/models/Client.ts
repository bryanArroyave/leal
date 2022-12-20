export default class Client {
  private constructor(
    public uuid: string,
    public name: string,
    public email: string,
    public points: number
  ) {}

  public static createClient(data: any) {
    return new Client(data.uuid, data.name, data.email, data.points);
  }
}
