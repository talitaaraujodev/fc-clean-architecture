import { Customer } from '../model/Customer';

export interface CustomerRepository {
  create(customer: Customer): Promise<Customer>;
  update(customer: Customer): Promise<Customer>;
  find(id: string): Promise<Customer>;
  findAll(): Promise<Customer[]>;
}
