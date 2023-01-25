import { Customer } from '../../customer/model/Customer';
import { Order } from '../model/Order';
import { OrderItem } from '../model/OrderItem';

export class OrderService {
  static total(orders: Order[]): number {
    return orders.reduce((acc, order) => acc + order.total, 0);
  }

  static placeOrder(customer: Customer, items: OrderItem[]): Order {
    if (items.length === 0) {
      throw new Error('Order must have at least one item');
    }
    const order = Order.createToSaved(customer.id, items);
    customer.addRewardPoints(order.total / 2);
    return order;
  }
}
