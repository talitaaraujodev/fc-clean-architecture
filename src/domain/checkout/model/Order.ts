import { v4 as uuid } from 'uuid';
import { ValidationError } from '../../../utils/errors/ValidationError';
import { OrderItem } from './OrderItem';
export class Order {
  private id: string;
  private customerId: string;
  private items: OrderItem[];
  private total: number;

  constructor(id: string, customerId: string, items: OrderItem[]) {
    this.id = id;
    this.customerId = customerId;
    this.items = items;
    this.total = this.getTotal;
    this.validate();
  }

  public static createToSaved(customerId: string, items: OrderItem[]): Order {
    const orderItems = items.map((item) => {
      return new OrderItem(item.id, item.price, item.productId, item.quantity);
    });

    return new Order(uuid(), customerId, orderItems);
  }

  get getId(): string {
    return this.id;
  }

  get getCustomerId(): string {
    return this.customerId;
  }

  get getItems(): OrderItem[] {
    return this.items;
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

  get getTotal(): number {
    return this.items.reduce((acc, item) => acc + item.price, 0);
  }
}
