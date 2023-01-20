import { Order } from '../entity/Order';

export interface IOrderRepository {
  create(order: Order): Promise<Order>;
  update(order: Order): Promise<Order>;
  find(id: string): Promise<Order>;
  findAll(): Promise<Order[]>;
}
