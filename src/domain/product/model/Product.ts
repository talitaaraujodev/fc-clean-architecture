import { v4 as uuid } from 'uuid';
import { ValidationError } from '../../../utils/errors/ValidationError';
export class Product {
  private _id: string;
  private _name: string;
  private _price: number;

  constructor(id: string, name: string, price: number) {
    this._id = id;
    this._name = name;
    this._price = price;
    this.validate();
  }

  static createToSaved(name: string, price: number): Product {
    const product = new Product(uuid(), name, price);

    return product;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get price(): number {
    return this._price;
  }

  changeName(name: string): void {
    this._name = name;
    this.validate();
  }

  changePrice(price: number): void {
    this._price = price;
    this.validate();
  }

  validate(): boolean {
    if (this.id.length === 0) {
      throw new ValidationError('Id é um campo obrigatório');
    }
    if (this.name.length === 0) {
      throw new ValidationError('Name é um campo obrigatório');
    }
    if (this.price < 0) {
      throw new ValidationError('Price deve ser maior que zero');
    }
    return true;
  }
}
