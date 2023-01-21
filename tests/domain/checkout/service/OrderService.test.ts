import { v4 as uuid } from 'uuid';
import { Customer } from '../../../../src/domain/customer/model/Customer';
import { Order } from '../../../../src/domain/checkout/model/Order';
import { OrderItem } from '../../../../src/domain/checkout/model/OrderItem';
import { OrderService } from '../../../../src/domain/checkout/service/OrderService';

describe('OrderService tests', () => {
  test('placeOrder_whenCUstomerValidAndItemValid_returnSuccess', () => {
    const customer = new Customer('1', 'Customer 1');
    const item1 = new OrderItem(uuid(), 10, uuid(), 1);
    const order = OrderService.placeOrder(customer, [item1]);

    expect(customer.rewardPoints).toBe(5);
    expect(order.getTotal).toBe(10);
  });
  test('total_whenOrdersValid_returnTotal', () => {
    const item1 = new OrderItem(uuid(), 100, uuid(), 1);
    const item2 = new OrderItem(uuid(), 200, uuid(), 2);

    const order1 = new Order(uuid(), uuid(), [item1]);
    const order2 = new Order(uuid(), uuid(), [item2]);

    const total = OrderService.total([order1, order2]);
    expect(total).toBe(500);
  });
});
