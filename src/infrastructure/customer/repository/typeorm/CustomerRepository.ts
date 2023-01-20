import { Address } from 'domain/customer/valueObject/Address';
import { Customer } from '../../../../domain/customer/entity/Customer';
import { ICustomerRepository } from 'domain/customer/repository/ICustomerRepository';
import { AppDataSource } from '../../../database/ormconfig';
import { CustomerEntity } from './CustomerEntitiy';
import { AddressEntity } from 'infrastructure/customer/repository/typeorm/AddressEntity';

export class CustomerRepository implements ICustomerRepository {
  private readonly repositoryCustomer =
    AppDataSource.getRepository(CustomerEntity);

  private readonly repositoryAddress =
    AppDataSource.getRepository(AddressEntity);

  async create(customer: Customer): Promise<Customer> {
    const customerEntitySaved: any = await this.repositoryCustomer.save({
      name: customer.getName,
      active: customer.isActive,
      rewardPoints: customer.getRewardPoints,
      addressId: customer.getAddress.getId,
    });
    return new Customer(customerEntitySaved.id, customer.getName);
  }

  async update(customer: Customer): Promise<Customer> {
    await this.find(customer.getId);
    const customerEntityUpdate: any = await this.repositoryCustomer.save({
      id: customer.getId,
      name: customer.getName,
      active: customer.isActive,
      rewardPoints: customer.getRewardPoints,
      addressId: customer.getAddress.getId,
    });
    return new Customer(customerEntityUpdate.id, customer.getName);
  }

  async find(id: number): Promise<Customer> {
    const product: any = await this.repositoryCustomer.findOneBy({ id });
    return new Customer(product.id, product.name);
  }

  async findAll(): Promise<Customer[]> {
    return Object.assign(await this.repositoryCustomer.find()) as Customer[];
  }

  async createAddress(address: Address): Promise<Address> {
    const addressEntitySaved: any = await this.repositoryAddress.save({
      street: address.getStreet,
      number: address.getNumber,
      zip: address.getZip,
      city: address.getCity,
    });
    return new Address(
      addressEntitySaved.id,
      address.getStreet,
      address.getNumber,
      address.getZip,
      address.getCity
    );
  }

  async updateAddress(address: Address): Promise<Address> {
    await this.find(address.getId);
    const addressEntityUpdate: any = await this.repositoryAddress.save({
      id: address.getId,
      street: address.getStreet,
      number: address.getNumber,
      zip: address.getZip,
      city: address.getCity,
    });
    return new Address(
      addressEntityUpdate.id,
      address.getStreet,
      address.getNumber,
      address.getZip,
      address.getCity
    );
  }
}
