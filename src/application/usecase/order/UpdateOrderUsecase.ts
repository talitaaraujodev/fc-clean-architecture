import { inject, injectable } from 'tsyringe';
import { OrderRepository } from '../../../domain/checkout/repository/OrderRepository';
import {
  InputUpdateOrderDto,
  OutputUpdateOrderDto,
} from './dto/UpdateOrderDto';

@injectable()
export class UpdateOrderUsecase {
  constructor(
    @inject('OrderRepository')
    private readonly orderRepository: OrderRepository
  ) {}

  async update(input: InputUpdateOrderDto): Promise<OutputUpdateOrderDto> {
    const order = await this.orderRepository.find(input.id);
    await this.orderRepository.update(order);

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
