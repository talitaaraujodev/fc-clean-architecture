export class Product {
  private id: string;
  private name: string;
  private price: number;

  constructor(id: string, name: string, price: number) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.validate();
  }

  get getId(): string {
    return this.id;
  }

  get getName(): string {
    return this.name;
  }

  get getPrice(): number {
    return this.price;
  }

  changeName(name: string): void {
    this.name = name;
    this.validate();
  }

  changePrice(price: number): void {
    this.price = price;
    this.validate();
  }

  validate(): boolean {
    if (this.name.length === 0) {
      throw new Error('Name é um campo obrigatório');
    }
    if (this.price < 0) {
      throw new Error('Price deve ser maior que zero');
    }
    return true;
  }
}
