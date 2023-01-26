import {
  InputUpdateOrderDto,
  OutputUpdateOrderDto,
} from './dto/UpdateOrderDto';
import { OrderRepositoryImpl } from './../../../infrastructure/persistence/repositories/OrderRepositoryImpl';
import { inject } from 'tsyringe';
import { OrderRepository } from '../../../domain/checkout/repository/OrderRepository';

class UpdateOrderUsecase {
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
export default new UpdateOrderUsecase(new OrderRepositoryImpl());
