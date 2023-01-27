import { createMock } from 'ts-auto-mock';
import { ValidationError } from '../../../../src/utils/errors/ValidationError';
import { UpdateCustomerUsecase } from '../../../../src/application/usecase/customer/UpdateCustomerUsecase';
import { CustomerRepository } from '../../../../src/domain/customer/repository/CustomerRepository';

describe('UpdateCustomerUsecase tests', () => {
  const mockCustomerRepository = createMock<CustomerRepository>();

  test('update_whenProductValid_returnSuccess', async () => {
    const updateCustomerUsecase = new UpdateCustomerUsecase(
      mockCustomerRepository
    );

    const input = {
      id: '123',
      name: 'John',
      address: {
        street: 'Street',
        number: 123,
        zip: 'Zip',
        city: 'City',
      },
    };
    expect(async () => {
      await updateCustomerUsecase.update(input);
    }).not.toThrow(ValidationError);

    expect(async () => {
      await updateCustomerUsecase.update(input);
    }).not.toThrow(Error);
  });
});
