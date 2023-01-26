export interface InputCreateOrderDto {
  customerId: string;
  items: {
    id: string;
    productId: string;
    price: number;
    quantity: number;
  }[];
}
export interface OutputCreateOrderDto {
  id: string;
  customerId: string;
  items: {
    id: string;
    productId: string;
    price: number;
    quantity: number;
  }[];
  total: number;
}
