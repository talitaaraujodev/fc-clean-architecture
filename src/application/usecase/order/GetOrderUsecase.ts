import { inject, injectable } from 'tsyringe';
import { OrderRepository } from '../../../domain/checkout/repository/OrderRepository';
import { Order } from './../../../domain/checkout/model/Order';
import { OutputFindOneOrderDto, OutputListOrderDto } from './dto/GetOrderDto';
@injectable()
export class GetOrderUsecase {
  constructor(
    @inject('OrderRepository')
    private readonly orderRepository: OrderRepository
  ) {}

  async findAll(): Promise<OutputListOrderDto> {
    const orders: Order[] = await this.orderRepository.findAll();
    console.log(orders);
    return {
      orders: orders.map((order: any) => ({
        id: order.id,
        customerId: order.customerId,
        items: order.orderItems.map((item: any) => ({
          productId: item.productId,
          price: item.price,
          quantity: item.quantity,
        })),
        total: order.total,
      })),
    };
  }

  async findOne(id: string): Promise<OutputFindOneOrderDto> {
    const order: Order = await this.orderRepository.find(id);
    console.log(order);
    return {
      id: order.id,
      customerId: order.customerId,
      items: order.items.map((item: any) => ({
        productId: item.productId,
        price: item.price,
        quantity: item.quantity,
      })),
      total: order.total,
    };
  }
}
