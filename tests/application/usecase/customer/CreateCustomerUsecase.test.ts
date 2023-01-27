import { createMock } from 'ts-auto-mock';
import { CreateCustomerUsecase } from '../../../../src/application/usecase/customer/CreateCustomerUsecase';
import { CustomerRepository } from '../../../../src/domain/customer/repository/CustomerRepository';
import { ValidationError } from './../../../../src/utils/errors/ValidationError';
describe('CreateCustomerUsecase tests', () => {
  const mockCustomerRepository = createMock<CustomerRepository>();
  test('create_whenCustomerValid_returnSuccess', () => {
    const createCustomerUsecase = new CreateCustomerUsecase(
      mockCustomerRepository
    );
    const input = {
      name: 'John',
      address: {
        street: 'Street',
        number: 123,
        zip: 'Zip',
        city: 'City',
      },
    };
    expect(async () => {
      await createCustomerUsecase.create(input);
    }).not.toThrow(ValidationError);
  });

  test('create_whenNameEmpty_returnValidationError', async () => {
    const createCustomerUsecase = new CreateCustomerUsecase(
      mockCustomerRepository
    );
    const input = {
      name: '',
      address: {
        street: 'Street',
        number: 123,
        zip: 'Zip',
        city: 'City',
      },
    };

    await expect(createCustomerUsecase.create(input)).rejects.toThrow(
      'Name é um campo obrigatório'
    );
  });
});
