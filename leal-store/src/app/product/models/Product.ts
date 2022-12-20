export default class Product {
  private constructor(
    public uuid: string,
    public name: string,
    public value: number,
    public points: number
  ) {}

  public static createProduct(data: any) {
    return new Product(data.uuid, data.name, data.value, data.points);
  }
}
