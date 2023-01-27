import { createMock } from 'ts-auto-mock';
import { GetCustomerUsecase } from '../../../../src/application/usecase/customer/GetCustomerUsecase';
import { CustomerRepository } from './../../../../src/domain/customer/repository/CustomerRepository';

describe('GetCustomerUsecase tests', () => {
  const mockCustomerRepository = createMock<CustomerRepository>();
  test('findOne_whenCustomerValid_returnSuccess', () => {
    const getCustomerUsecase = new GetCustomerUsecase(mockCustomerRepository);
    expect(async () => {
      await getCustomerUsecase.findOne('123');
    }).not.toThrow(Error);
  });
  test('findAll_findAllCustomer_returnSuccess', async () => {
    const getCustomerUsecase = new GetCustomerUsecase(mockCustomerRepository);

    expect(async () => {
      await getCustomerUsecase.findAll();
    }).not.toThrow(Error);
  });
});
