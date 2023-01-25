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

  public static createToSaved(customerId: string, items: OrderItem[]): Order {
    const orderItems = items.map((item) => {
      return new OrderItem(item.id, item.price, item.productId, item.quantity);
    });

    return new Order(uuid(), customerId, orderItems);
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

    return true;
  }

  get total(): number {
    return this.items.reduce((acc, item) => acc + item.price, 0);
  }
}
