import { OrderEntity } from './OrderEntity';
import { AppDataSource } from '../../../database/ormconfig';
import { Order } from '../../../../domain/checkout/entity/Order';
import { IOrderRepository } from 'domain/checkout/repository/IOrderRepository';

export class OrderRepository implements IOrderRepository {
  private readonly repository = AppDataSource.getRepository(OrderEntity);
  async create(order: Order): Promise<Order> {
    throw new Error('Method not implemented.');
  }

  async update(order: Order): Promise<Order> {
    throw new Error('Method not implemented.');
  }

  async find(id: number): Promise<Order> {
    const order: any = await this.repository.findOneBy({ id });
    return new Order(order.id, order.customer, order.products);
  }

  async findAll(): Promise<Order[]> {
    return Object.assign(await this.repository.find()) as Order[];
  }
}
