import { OrderItem } from '../model/OrderItem';
import { Order } from '../model/Order';
import { Customer } from '../../customer/model/Customer';

// service são Stateless
export class OrderService {
  static total(orders: Order[]): number {
    return orders.reduce((acc, order) => acc + order.getTotal, 0);
  }

  static placeOrder(customer: Customer, items: OrderItem[]): Order {
    if (items.length === 0) {
      throw new Error('Order must have at least one item');
    }
    const order = Order.createToSaved(customer.id, items);
    customer.addRewardPoints(order.getTotal / 2);
    return order;
  }
}
