import { v4 as uuid } from 'uuid';
import { inject } from 'tsyringe';
import { OrderItem } from './../../../domain/checkout/model/OrderItem';
import { OrderRepository } from '../../../domain/checkout/repository/OrderRepository';
import { Order } from './../../../domain/checkout/model/Order';
import { OrderRepositoryImpl } from './../../../infrastructure/persistence/repositories/OrderRepositoryImpl';
import {
  InputCreateOrderDto,
  OutputCreateOrderDto,
} from './dto/CreateOrderDto';

class CreateOrderUsecase {
  constructor(
    @inject('OrderRepository')
    private readonly orderRepository: OrderRepository
  ) {}

  async create(input: InputCreateOrderDto): Promise<OutputCreateOrderDto> {
    const orderItems = input.items.map((item) => {
      return new OrderItem(uuid(), item.price, item.productId, item.quantity);
    });

    const order = new Order(uuid(), input.customerId, orderItems);
    return await this.orderRepository.create(order);
  }
}
export default new CreateOrderUsecase(new OrderRepositoryImpl());
