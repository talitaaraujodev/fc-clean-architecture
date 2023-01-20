import { OrderItem } from '../entity/OrderItem';
import { Order } from '../entity/Order';
import { Customer } from '../../customer/entity/Customer';

// service são Stateless
export class OrderService {
  static total(orders: Order[]): number {
    return orders.reduce((acc, order) => acc + order.getTotal, 0);
  }

  static placeOrder(customer: Customer, items: OrderItem[]): Order {
    if (items.length === 0) {
      throw new Error('Order must have at least one item');
    }
    const order = Order.createToSaved(customer.getId, items);
    customer.addRewardPoints(order.getTotal / 2);
    return order;
  }
}
