import { Customer } from '../../../../src/domain/customer/entity/Customer';
import { Order } from '../../../../src/domain/checkout/entity/Order';
import { OrderItem } from '../../../../src/domain/checkout/entity/OrderItem';
import { OrderService } from '../../../../src/domain/checkout/service/OrderService';

describe('OrderService tests', () => {
  test('placeOrder_whenCUstomerValidAndItemValid_returnSuccess', () => {
    const customer = new Customer(1, 'Customer 1');
    const item1 = new OrderItem(1, 10, 1, 1);
    const order = OrderService.placeOrder(customer, [item1]);

    expect(customer.getRewardPoints).toBe(5);
    expect(order.getTotal).toBe(10);
  });
  test('total_whenOrdersValid_returnTotal', () => {
    const item1 = new OrderItem(1, 100, 1, 1);
    const item2 = new OrderItem(2, 200, 2, 2);

    const order1 = new Order(1, 1, [item1]);
    const order2 = new Order(2, 2, [item2]);

    const total = OrderService.total([order1, order2]);
    expect(total).toBe(500);
  });
});
