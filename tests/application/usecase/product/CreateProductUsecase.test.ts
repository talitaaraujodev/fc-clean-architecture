import { createMock } from 'ts-auto-mock';
import { CreateProductUsecase } from '../../../../src/application/usecase/product/CreateProductUsecase';
import { ProductRepository } from '../../../../src/domain/product/repository/ProductRepository';
import { ValidationError } from './../../../../src/utils/errors/ValidationError';
describe('CreateProductUsecase tests', () => {
  const mockProductRepository = createMock<ProductRepository>();

  test('create_whenProductValid_returnSuccess', async () => {
    const createProductUsecase = new CreateProductUsecase(
      mockProductRepository
    );
    
    const input = {
      name: 'John',
      price: 10,
    };
    expect(async () => {
      await createProductUsecase.create(input);
    }).not.toThrow(ValidationError);
  });
  test('create_whenNameEmpty_returnValidationError', async () => {
    const createProductUsecase = new CreateProductUsecase(
      mockProductRepository
    );
    const input = {
      name: '',
      price: 10,
    };

    await expect(createProductUsecase.create(input)).rejects.toThrow(
      'Name é um campo obrigatório'
    );
  });
  test('create_whenPriceEqualZero_returnValidationError', async () => {
    const createProductUsecase = new CreateProductUsecase(
      mockProductRepository
    );
    const input = {
      name: 'John',
      price: 0,
    };

    await expect(createProductUsecase.create(input)).rejects.toThrow(
      'Price deve ser maior que zero'
    );
  });
});
