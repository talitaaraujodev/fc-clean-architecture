import { OutputListCustomerDto } from './dto/ListCustomerDto';
import { OutputFindOneCustomerDto } from './dto/FindCustomerDto';
import {
  OutputCreateCustomerDto,
  InputCreateCustomerDto,
} from './dto/CreateCustomerDto';

import {
  InputUpdateCustomerDto,
  OutputUpdateCustomerDto,
} from './dto/UpdateCustomerDto';

export interface CustomerUsecaseInput {
  create(input: InputCreateCustomerDto): Promise<OutputCreateCustomerDto>;
  findOne(id: string): Promise<OutputFindOneCustomerDto>;
  findAll(): Promise<OutputListCustomerDto>;
  update(input: InputUpdateCustomerDto): Promise<OutputUpdateCustomerDto>;
}
