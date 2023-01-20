export class OrderItem {
  private id: string;
  private productId: string;
  private price: number;
  private quantity: number;

  constructor(id: string, price: number, productId: string, quantity: number) {
    this.id = id;
    this.price = price;
    this.productId = productId;
    this.quantity = quantity;
  }

  get getId(): string {
    return this.id;
  }

  get getProductId(): string {
    return this.productId;
  }

  get getQuantity(): number {
    return this.quantity;
  }

  get getPrice(): number {
    return this.price * this.quantity;
  }
}
