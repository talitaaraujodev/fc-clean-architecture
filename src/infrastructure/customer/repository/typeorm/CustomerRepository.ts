import { Customer } from '../../../../domain/customer/entity/Customer';
import { ICustomerRepository } from 'domain/customer/repository/ICustomerRepository';
import { AppDataSource } from '../../../database/ormconfig';
import { CustomerEntity } from './CustomerEntitiy';

export class CustomerRepository implements ICustomerRepository {
  private readonly repository = AppDataSource.getRepository(CustomerEntity);

  async create(customer: Customer): Promise<Customer> {
    const customerEntitySaved: any = await this.repository.save({
      name: customer.getName,
      active: customer.isActive,
      rewardPoints: customer.getRewardPoints,
      addressId: customer.getAddress.getId,
    });
    return new Customer(customerEntitySaved.id, customer.getName);
  }

  async update(customer: Customer): Promise<Customer> {
    await this.find(customer.getId);
    const customerEntityUpdate: any = await this.repository.save({
      id: customer.getId,
      name: customer.getName,
      active: customer.isActive,
      rewardPoints: customer.getRewardPoints,
      addressId: customer.getAddress.getId,
    });
    return new Customer(customerEntityUpdate.id, customer.getName);
  }

  async find(id: number): Promise<Customer> {
    const product: any = await this.repository.findOneBy({ id });
    return new Customer(product.id, product.name);
  }

  async findAll(): Promise<Customer[]> {
    return Object.assign(await this.repository.find()) as Customer[];
  }
}
