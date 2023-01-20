import { v4 as uuid } from 'uuid';
import { Address } from '../../../../src/domain/customer/valueObject/Address';
import { Customer } from '../../../../src/domain/customer/entity/Customer';
describe('Customer tests', () => {
  test('validate_whenNameEmpty_returnError', () => {
    expect(() => {
      const customer = new Customer(uuid(), '');
    }).toThrowError('Name é um campo obrigatório');
  });
  test('changeName_whenNameToChange_returnName', () => {
    const customer = new Customer(uuid(), 'Customer test');

    customer.changeName('Jubileu');

    expect(customer.getName).toBe('Jubileu');
  });
  test('activate_whenProductActivate_returnSuccess', () => {
    const customer = new Customer(uuid(), 'Customer test');

    const address = new Address('Rua ABC', 123, '15220-250', 'São Paulo');
    customer.changeAddress(address);

    customer.activate();

    expect(customer.isActive).toBe(2);
  });
  test('deactivate_whenProductDesactivate_returnSuccess', () => {
    const customer = new Customer(uuid(), 'Customer test');

    customer.deactivate();

    expect(customer.isActive).toBe(1);
  });
  test('activate_whenAddressUndefined_returnError', () => {
    expect(() => {
      const customer = new Customer(uuid(), 'Customer test');
      customer.activate();
    }).toThrowError('Address é um campo obrigatório para ativar um cliente');
  });
  test('addRewardPoints_whenAddRewardPoints_returnSuccess', () => {
    const customer = new Customer(uuid(), 'Customer test');
    expect(customer.getRewardPoints).toBe(0);

    customer.addRewardPoints(10);
    expect(customer.getRewardPoints).toBe(10);

    customer.addRewardPoints(10);
    expect(customer.getRewardPoints).toBe(20);
  });
});
