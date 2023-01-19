import { CustomerFactory } from '../../../../src/domain/customer/factory/CustomerFactory';
import { Address } from '../../../../src/domain/customer/valueObject/Address';

describe('Customerfactory tests', () => {
  it('should create a customer', () => {
    const customer = CustomerFactory.create('John');

    expect(customer.getId).toBeDefined();
    expect(customer.getName).toBe('John');
    expect(customer.getAddress).toBeUndefined();
  });

  it('should create a customer with an address', () => {
    const address = new Address(1, 'Street', 1, '13330-250', 'São Paulo');

    const customer = CustomerFactory.createWithAddress('John', address);

    expect(customer.getId).toBeDefined();
    expect(customer.getName).toBe('John');
    expect(customer.getAddress).toBe(address);
  });
});
