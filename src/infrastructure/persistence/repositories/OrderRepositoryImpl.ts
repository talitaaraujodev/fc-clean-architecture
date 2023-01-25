import { Repository } from 'typeorm';
import { Order } from '../../../domain/checkout/model/Order';
import { OrderRepository } from '../../../domain/checkout/repository/OrderRepository';
import { AppDataSource } from '../../config/database/ormconfig';
import { OrderEntity } from '../entities/OrderEntity';

export class OrderRepositoryImpl implements OrderRepository {
  private readonly orderRepository: Repository<OrderEntity> =
    AppDataSource.getRepository(OrderEntity);

  async create(order: Order): Promise<Order> {
    const orderEntitySaved: any = await this.orderRepository.save({
      total: order.total,
      orderItems: order.items.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        price: item.price,
        ordersId: order.id,
        productsId: item.productId,
      })),
      customerId: order.customerId,
    });
    return new Order(orderEntitySaved.id, order.customerId, order.items);
  }

  async update(order: Order): Promise<Order> {
    await this.find(order.id);
    const orderEntityUpdated: any = await this.orderRepository.save({
      total: order.total,
      orderItems: order.items.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        price: item.price,
        ordersId: order.id,
        productsId: item.productId,
      })),
      customerId: order.customerId,
    });
    return new Order(orderEntityUpdated.id, order.customerId, order.items);
  }

  async find(id: string): Promise<Order> {
    const order: any = await this.orderRepository.findOneBy({ id });
    return new Order(order.id, order.customer, order.products);
  }

  async findAll(): Promise<Order[]> {
    return Object.assign(await this.orderRepository.find()) as Order[];
  }
}
