type Order = {
  id: string;
  customerId: string;
  items: {
    productId: string;
    price: number;
    quantity: number;
  }[];
  total: number;
};
export interface OutputListOrderDto {
  orders: Order[];
}
export interface OutputFindOneOrderDto {
  id: string;
  customerId: string;
  items: {
    productId: string;
    price: number;
    quantity: number;
  }[];
  total: number;
}
