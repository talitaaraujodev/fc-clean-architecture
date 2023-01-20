import { OrderEntity } from './OrderEntity';
import { AppDataSource } from '../../../database/ormconfig';
import { Order } from '../../../../domain/checkout/entity/Order';
import { IOrderRepository } from 'domain/checkout/repository/IOrderRepository';
import { Repository } from 'typeorm';

export class OrderRepository implements IOrderRepository {
  private readonly orderRepository: Repository<OrderEntity> =
    AppDataSource.getRepository(OrderEntity);

  async create(order: Order): Promise<Order> {
    const orderEntitySaved: any = await this.orderRepository.save({
      total: order.getTotal,
      orderItems: order.getItems.map((item) => ({
        id: item.getId,
        quantity: item.getQuantity,
        price: item.getPrice,
        ordersId: order.getId,
        productsId: item.getProductId,
      })),
      customerId: order.getCustomerId,
    });
    return new Order(orderEntitySaved.id, order.getCustomerId, order.getItems);
  }

  async update(order: Order): Promise<Order> {
    await this.find(order.getId);
    const orderEntityUpdated: any = await this.orderRepository.save({
      total: order.getTotal,
      orderItems: order.getItems.map((item) => ({
        id: item.getId,
        quantity: item.getQuantity,
        price: item.getPrice,
        ordersId: order.getId,
        productsId: item.getId,
      })),
      customerId: order.getCustomerId,
    });
    return new Order(
      orderEntityUpdated.id,
      order.getCustomerId,
      order.getItems
    );
  }

  async find(id: string): Promise<Order> {
    const order: any = await this.orderRepository.findOneBy({ id });
    return new Order(order.id, order.customer, order.products);
  }

  async findAll(): Promise<Order[]> {
    return Object.assign(await this.orderRepository.find()) as Order[];
  }
}
