import { Customer } from '../entity/Customer';
import { Address } from '../valueObject/Address';

export class CustomerFactory {
  public static create(name: string): Customer {
    return new Customer(0, name);
  }

  public static createWithAddress(name: string, address: Address): Customer {
    const customer = new Customer(0, name);
    customer.changeAddress(address);
    return customer;
  }
}
