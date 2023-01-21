import { inject, injectable } from 'tsyringe';
import { Address } from './../../../domain/customer/valueObject/Address';
import { Customer } from '../../../domain/customer/model/Customer';
import { CustomerRepository } from './../../../domain/customer/repository/ICustomerRepository';
import { CustomerUsecaseInput } from './CustomerUsecaseInput';
import {
  InputCreateCustomerDto,
  OutputCreateCustomerDto,
} from './dto/CreateCustomerDto';
import { OutputFindOneCustomerDto } from './dto/FindCustomerDto';
import { OutputListCustomerDto } from './dto/ListCustomerDto';
import {
  InputUpdateCustomerDto,
  OutputUpdateCustomerDto,
} from './dto/UpdateCustomerDto';

@injectable()
export class CustomerUsecase implements CustomerUsecaseInput {
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

    return this.customerRepository.create(customer);
  }

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
    const customers = await this.customerRepository.findAll();
    return {
      customers: customers.map((customer: any) => ({
        id: customer.id,
        name: customer.name,
        address: {
          street: customer.Address.street,
          number: customer.Address.number,
          zip: customer.Address.zip,
          city: customer.Address.city,
        },
      })),
    };
  }

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
