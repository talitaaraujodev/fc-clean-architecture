import { Repository } from 'typeorm';
import { Address } from '../../../domain/customer/valueObject/Address';
import { Customer } from '../../../domain/customer/model/Customer';
import { CustomerRepository } from 'domain/customer/repository/ICustomerRepository';
import { AppDataSource } from '../../config/database/ormconfig';
import { CustomerEntity } from '../entities/CustomerEntitiy';
import { AddressEntity } from '../entities/AddressEntity';

export class CustomerRepositoryImpl implements CustomerRepository {
  private readonly repositoryCustomer: Repository<CustomerEntity> =
    AppDataSource.getRepository(CustomerEntity);

  private readonly repositoryAddress: Repository<AddressEntity> =
    AppDataSource.getRepository(AddressEntity);

  async create(customer: Customer): Promise<Customer> {
    const addressEntityCreated: any = await this.createAddress(
      customer.address
    );

    const customerEntitySaved: any = await this.repositoryCustomer.save({
      name: customer.name,
      active: customer.isActive,
      rewardPoints: customer.rewardPoints,
      addressId: addressEntityCreated.id,
    });
    return new Customer(customerEntitySaved.id, customer.name);
  }

  async update(customer: Customer): Promise<Customer> {
    await this.find(customer.id);
    const customerEntityUpdate: any = await this.repositoryCustomer.save({
      id: customer.id,
      name: customer.name,
      active: customer.isActive,
      rewardPoints: customer.rewardPoints,
    });
    return new Customer(customerEntityUpdate.id, customer.name);
  }

  async find(id: string): Promise<Customer> {
    const customer: any = await this.repositoryCustomer.findOneBy({ id });
    return new Customer(customer.id, customer.name);
  }

  async findAddress(id: string): Promise<Address> {
    const address: any = await this.repositoryAddress.findOneBy({ id });
    return new Address(
      address.street,
      address.number,
      address.zip,
      address.city
    );
  }

  async findAll(): Promise<Customer[]> {
    return Object.assign(await this.repositoryCustomer.find()) as Customer[];
  }

  async createAddress(address: Address): Promise<Address> {
    await this.repositoryAddress.save({
      street: address.street,
      number: address.number,
      zip: address.zip,
      city: address.city,
    });
    return new Address(
      address.street,
      address.number,
      address.zip,
      address.city
    );
  }

  async updateAddress(address: Address, id: string): Promise<Address> {
    await this.repositoryAddress.save({
      street: address.street,
      number: address.number,
      zip: address.zip,
      city: address.city,
      customers: [{ id }],
    });
    return new Address(
      address.street,
      address.number,
      address.zip,
      address.city
    );
  }
}
