/* eslint-disable @typescript-eslint/no-unused-vars */
import { v4 as uuid } from 'uuid';
import { Address } from '../../../../src/domain/customer/valueObject/Address';
import { Customer } from '../../../../src/domain/customer/model/Customer';
describe('Customer tests', () => {
  test('validate_whenNameEmpty_returnError', () => {
    expect(() => {
      const customer = new Customer(uuid(), '');
    }).toThrowError('Name é um campo obrigatório');
  });
  test('changeName_whenNameToChange_returnName', () => {
    const customer = new Customer(uuid(), 'Customer test');

    customer.changeName('Jubileu');

    expect(customer.name).toBe('Jubileu');
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
    expect(customer.rewardPoints).toBe(0);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(10);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(20);
  });
  test('createToSaved_whenCustomerValid_returnSuccess', () => {
    const address = new Address('Street', 1, '13330-250', 'São Paulo');

    const customer = Customer.createToSaved('John', address);

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe('John');
    expect(customer.address).toBe(address);
  });
});
