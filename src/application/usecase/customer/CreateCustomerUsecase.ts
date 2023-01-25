import { inject } from 'tsyringe';
import { Customer } from './../../../domain/customer/model/Customer';
import { CustomerRepository } from './../../../domain/customer/repository/CustomerRepository';
import { Address } from './../../../domain/customer/valueObject/Address';
 import { CustomerRepositoryImpl } from './../../../infrastructure/persistence/repositories/CustomerRepositoryImpl';
import {
  InputCreateCustomerDto,
  OutputCreateCustomerDto
} from './dto/CreateCustomerDto';

 class CreateCustomerUsecase {
  constructor(
    @inject('CustomerRepository')
    private readonly customerRepository: CustomerRepository
  ) {}

  async create(
    input: InputCreateCustomerDto
  ): Promise<OutputCreateCustomerDto> {
    const customer = Customer.createToSaved(
      input.name,
      new Address(
        input.address.street,
        input.address.number,
        input.address.zip,
        input.address.city
      )
    );

    return await this.customerRepository.create(customer);
  }
}
export default new CreateCustomerUsecase(new CustomerRepositoryImpl());
