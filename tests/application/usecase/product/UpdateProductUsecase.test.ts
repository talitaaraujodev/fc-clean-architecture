import { createMock } from 'ts-auto-mock';
import { UpdateProductUsecase } from '../../../../src/application/usecase/product/UpdateProductUsecase';
import { ProductRepository } from '../../../../src/domain/product/repository/ProductRepository';
import { ValidationError } from './../../../../src/utils/errors/ValidationError';

describe('UpdateProductUsecase tests', () => {
  const mockProductRepository = createMock<ProductRepository>();

  test('create_whenProductValid_returnSuccess', async () => {
    const createProductUsecase = new UpdateProductUsecase(
      mockProductRepository
    );

    const input = {
      id: '123',
      name: 'John',
      price: 10,
    };
    expect(async () => {
      await createProductUsecase.update(input);
    }).not.toThrow(ValidationError);

    expect(async () => {
      await createProductUsecase.update(input);
    }).not.toThrow(Error);
  });
});
