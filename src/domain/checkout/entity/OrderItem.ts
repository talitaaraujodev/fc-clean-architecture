export class OrderItem {
  private id: number;
  private productId: number;
  private price: number;
  private quantity: number;

  constructor(id: number, price: number, productId: number, quantity: number) {
    this.id = id;
    this.price = price;
    this.productId = productId;
    this.quantity = quantity;
  }

  get getId(): number {
    return this.id;
  }

  get getProductId(): number {
    return this.productId;
  }

  get getQuantity(): number {
    return this.quantity;
  }

  get getPrice(): number {
    return this.price * this.quantity;
  }
}
