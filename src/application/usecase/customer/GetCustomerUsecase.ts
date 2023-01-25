import { inject } from 'tsyringe';
import { Customer } from '../../../domain/customer/model/Customer';
import { CustomerRepository } from './../../../domain/customer/repository/CustomerRepository';
import { CustomerRepositoryImpl } from './../../../infrastructure/persistence/repositories/CustomerRepositoryImpl';
import {
  OutputFindOneCustomerDto,
  OutputListCustomerDto
} from './dto/GetCustomerDto';

class GetCustomerUsecase {
  constructor(
    @inject('CustomerRepository')
    private readonly customerRepository: CustomerRepository
  ) {}

  async findOne(id: string): Promise<OutputFindOneCustomerDto> {
    const customer = await this.customerRepository.find(id);
    return {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.address.street,
        city: customer.address.city,
        number: customer.address.number,
        zip: customer.address.zip,
      },
    };
  }

  async findAll(): Promise<OutputListCustomerDto> {
    const customers: Customer[] = await this.customerRepository.findAll();

    return {
      customers: customers.map((customer: any) => ({
        id: customer.id,
        name: customer.name,
        address: {
          street: customer.address.street,
          number: customer.address.number,
          zip: customer.address.zip,
          city: customer.address.city,
        },
      })),
    };
  }
}
export default new GetCustomerUsecase(new CustomerRepositoryImpl());
