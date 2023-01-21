import { OrderItem } from './OrderItem';
import { v4 as uuid } from 'uuid';
import { ValidationError } from '../../../utils/errors/ValidationError';
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

  static createToSaved(customerId: string, items: OrderItem[]): Order {
    return new Order(uuid(), customerId, items);
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

    if (this.items.some((item) => item.getQuantity <= 0)) {
      throw new ValidationError('Quantity deve ser maior que zero');
    }

    return true;
  }

  get getTotal(): number {
    return this.items.reduce((acc, item) => acc + item.getPrice, 0);
  }
}
