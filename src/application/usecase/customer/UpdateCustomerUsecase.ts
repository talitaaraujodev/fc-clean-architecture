import { inject } from 'tsyringe';
import { CustomerRepository } from '../../../domain/customer/repository/CustomerRepository';
import { Address } from '../../../domain/customer/valueObject/Address';
import { CustomerRepositoryImpl } from './../../../infrastructure/persistence/repositories/CustomerRepositoryImpl';
import {
  InputUpdateCustomerDto,
  OutputUpdateCustomerDto,
} from './dto/UpdateCustomerDto';

class UpdateCustomerUsecase {
  constructor(
    @inject('CustomerRepository')
    private readonly customerRepository: CustomerRepository
  ) {}

  async update(
    input: InputUpdateCustomerDto
  ): Promise<OutputUpdateCustomerDto> {
    const customer = await this.customerRepository.find(input.id);
    customer.changeName(input.name);
    customer.changeAddress(
      new Address(
        input.address.street,
        input.address.number,
        input.address.zip,
        input.address.city
      )
    );
    await this.customerRepository.update(customer);

    return {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.address.street,
        number: customer.address.number,
        zip: customer.address.zip,
        city: customer.address.city,
      },
    };
  }
}
export default new UpdateCustomerUsecase(new CustomerRepositoryImpl());
