/* eslint-disable @typescript-eslint/no-unused-vars */
import { v4 as uuid } from 'uuid';
import { Order } from '../../../../src/domain/checkout/model/Order';
import { OrderItem } from '../../../../src/domain/checkout/model/OrderItem';
describe('Order tests', () => {
  test('validate_whenCustomerIdEmpty_returnError', () => {
    expect(() => {
      const item1 = new OrderItem(uuid(), 10, uuid(), 0);
      const item2 = new OrderItem(uuid(), 20, uuid(), 1);
      const order = new Order(uuid(), '', [item1, item2]);
    }).toThrowError('CustomerId é um campo obrigatório');
  });
  test('validate_whenItemsEmpty_returnError', () => {
    expect(() => {
      const order = new Order(uuid(), uuid(), []);
    }).toThrowError('Items é um campo obrigatório');
  });
  test('validate_whenQuantityItemsEmpty_returnError', () => {
    expect(() => {
      const item1 = new OrderItem(uuid(), 10, uuid(), 0);
      const item2 = new OrderItem(uuid(), 20, uuid(), 1);
      const order = new Order(uuid(), uuid(), [item1, item2]);
    }).toThrowError('Quantity deve ser maior que zero');
  });
  test('getTotal_whengetTotal_returnTotal', () => {
    const item1 = new OrderItem(uuid(), 10, uuid(), 1);
    const item2 = new OrderItem(uuid(), 20, uuid(), 1);

    const order = new Order(uuid(), uuid(), [item1]);

    let total = order.getTotal;

    expect(order.getTotal).toBe(10);

    const order2 = new Order(uuid(), uuid(), [item1, item2]);
    total = order2.getTotal;
    expect(total).toBe(30);
  });
});
