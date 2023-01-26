export interface InputUpdateOrderDto {
  id: string;
  customerId: string;
  items: {
    productId: string;
    price: number;
    quantity: number;
  }[];
}

export interface OutputUpdateOrderDto {
  id: string;
  customerId: string;
  items: {
    productId: string;
    price: number;
    quantity: number;
  }[];
  total: number;
}
