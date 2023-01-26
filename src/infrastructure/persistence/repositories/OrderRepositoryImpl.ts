import { Repository } from 'typeorm';
import { Order } from '../../../domain/checkout/model/Order';
import { OrderRepository } from '../../../domain/checkout/repository/OrderRepository';
import { AppDataSource } from '../../config/database/ormconfig';
import { OrderEntity } from '../entities/OrderEntity';
import { OrderItemsEntity } from '../entities/OrderItemEntity';
import { OrderItem } from './../../../domain/checkout/model/OrderItem';

export class OrderRepositoryImpl implements OrderRepository {
  private readonly orderRepository: Repository<OrderEntity> =
    AppDataSource.getRepository(OrderEntity);

  private readonly orderItemsRepository: Repository<OrderItemsEntity> =
    AppDataSource.getRepository(OrderItemsEntity);

  async create(order: Order): Promise<Order> {
    await this.orderRepository.save({
      id: order.id,
      customer: { id: order.customerId },
      total: order.total,
    });
    const orderItems: any = order.items.map((item) => ({
      id: item.id,
      quantity: item.quantity,
      price: item.price,
      ordersId: order.id,
      productsId: item.productId,
    }));

    await this.createOrderItems(orderItems);

    return new Order(order.id, order.customerId, order.items);
  }

  async createOrderItems(items: OrderItemsEntity[]): Promise<OrderItem[]> {
    const orderItemsEntitySaved: any = this.orderItemsRepository.save(
      items.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        price: item.price,
        ordersId: item.ordersId,
        productsId: item.productsId,
      }))
    );
    return items.map((item) => {
      return new OrderItem(
        orderItemsEntitySaved.id,
        item.price,
        item.productsId,
        item.quantity
      );
    });
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
    const order: any = await this.orderRepository.findOne({
      where: { id },
      relations: ['orderItems', 'customer'],
    });
    return new Order(order.id, order.customer, order.orderItems);
  }

  async findAll(): Promise<Order[]> {
    return Object.assign(
      await this.orderRepository.find({
        relations: ['orderItems', 'customer'],
      })
    ) as Order[];
  }
}
