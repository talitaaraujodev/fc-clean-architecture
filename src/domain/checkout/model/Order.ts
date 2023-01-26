import { v4 as uuid } from 'uuid';
import { ValidationError } from '../../../utils/errors/ValidationError';
import { OrderItem } from './OrderItem';
export class Order {
  private _id: string;
  private _customerId: string;
  private _items: OrderItem[];
  private _total: number;

  constructor(id: string, customerId: string, items: OrderItem[]) {
    this._id = id;
    this._customerId = customerId;
    this._items = items;
    this._total = this.total;
    this.validate();
  }

  get id(): string {
    return this._id;
  }

  get customerId(): string {
    return this._customerId;
  }

  get items(): OrderItem[] {
    return this._items;
  }

  static createToSaved(customerId: string, items: OrderItem[]): Order {
    const orderItems = items.map((item) => {
      return new OrderItem(uuid(), item.price, item.productId, item.quantity);
    });

    return new Order(uuid(), customerId, orderItems);
  }

  validate(): boolean {
    if (this.id === '') {
      throw new ValidationError('Id é um campo obrigatório');
    }
    if (this.customerId === '') {
      throw new ValidationError('CustomerId é um campo obrigatório');
    }
    if (this.items.length === 0) {
      throw new ValidationError('Items é um campo obrigatório');
    }
    if (this.items.some((item) => item.quantity <= 0)) {
      throw new ValidationError('Quantity deve ser maior que zero');
    }
    if (this.items.some((item) => item.price <= 0)) {
      throw new ValidationError('Price deve ser maior que zero');
    }
    if (this.items.some((item) => item.productId === '')) {
      throw new ValidationError('ProductId é um campo obrigatório');
    }

    return true;
  }

  get total(): number {
    return this.items.reduce((acc, item) => acc + item.price, 0);
  }
}
