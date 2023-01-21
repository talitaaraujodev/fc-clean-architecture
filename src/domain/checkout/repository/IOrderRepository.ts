import { Order } from '../model/Order';

export interface OrderRepository {
  create(order: Order): Promise<Order>;
  update(order: Order): Promise<Order>;
  find(id: string): Promise<Order>;
  findAll(): Promise<Order[]>;
}
