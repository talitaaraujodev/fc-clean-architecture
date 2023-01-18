import { OrderItem } from './OrderItem';

export class Order {
  private id: number;
  private customerId: number;
  private items: OrderItem[];
  private total: number;

  constructor(id: number, customerId: number, items: OrderItem[]) {
    this.id = id;
    this.customerId = customerId;
    this.items = items;
    this.total = this.getTotal;
    this.validate();
  }

  static createToSaved(customerId: number, items: OrderItem[]): Order {
    return new Order(0, customerId, items);
  }

  get getId(): number {
    return this.id;
  }

  get getCustomerId(): number {
    return this.customerId;
  }

  get getItems(): OrderItem[] {
    return this.items;
  }

  validate(): boolean {
    if (this.customerId === 0) {
      throw new Error('CustomerId é um campo obrigatório');
    }
    if (this.items.length === 0) {
      throw new Error('Items é um campo obrigatório');
    }

    if (this.items.some((item) => item.getQuantity <= 0)) {
      throw new Error('Quantity deve ser maior que zero');
    }

    return true;
  }

  get getTotal(): number {
    return this.items.reduce((acc, item) => acc + item.getPrice, 0);
  }
}
