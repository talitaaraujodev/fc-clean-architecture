import { Customer } from '../entity/Customer';

export interface ICustomerRepository {
  create(customer: Customer): Promise<Customer>;
  update(customer: Customer): Promise<Customer>;
  find(id: number): Promise<Customer>;
  findAll(): Promise<Customer[]>;
}
