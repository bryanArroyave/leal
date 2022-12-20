export default class Gift {
  private constructor(
    public uuid: string,
    public name: string,
    public points: number
  ) {}

  public static createGift(data: any) {
    return new Gift(data.uuid, data.name, data.points);
  }
}
