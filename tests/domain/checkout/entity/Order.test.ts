import { Order } from '../../../../src/domain/checkout/entity/Order';
import { OrderItem } from '../../../../src/domain/checkout/entity/OrderItem';
describe('Order tests', () => {
  it('validate_whenCustomerIdEmpty_returnError', () => {
    expect(() => {
      const item1 = new OrderItem(1, 10, 1, 0);
      const item2 = new OrderItem(2, 20, 2, 1);
      const order = new Order(1, 0, [item1, item2]);
    }).toThrowError('CustomerId é um campo obrigatório');
  });
  it('validate_whenItemsEmpty_returnError', () => {
    expect(() => {
      const order = new Order(1, 1, []);
    }).toThrowError('Items é um campo obrigatório');
  });
  it('validate_whenQuantityItemsEmpty_returnError', () => {
    expect(() => {
      const item1 = new OrderItem(1, 10, 1, 0);
      const item2 = new OrderItem(2, 20, 2, 1);
      const order = new Order(1, 1, [item1, item2]);
    }).toThrowError('Quantity deve ser maior que zero');
  });
  it('getTotal_whengetTotal_returnTotal', () => {
    const item1 = new OrderItem(1, 10, 1, 1);
    const item2 = new OrderItem(2, 20, 2, 1);

    const order = new Order(1, 1, [item1]);

    let total = order.getTotal;

    expect(order.getTotal).toBe(10);

    const order2 = new Order(1, 1, [item1, item2]);
    total = order2.getTotal;
    expect(total).toBe(30);
  });
});
