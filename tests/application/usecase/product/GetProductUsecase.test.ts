import { createMock } from 'ts-auto-mock';
import { GetProductUsecase } from '../../../../src/application/usecase/product/GetProductUsecase';
import { ProductRepository } from '../../../../src/domain/product/repository/ProductRepository';

describe('GetProductUsecase tests', () => {
  const mockProductRepository = createMock<ProductRepository>();
  test('findOne_whenProductValid_returnSuccess', async () => {
    const getProductUsecase = new GetProductUsecase(mockProductRepository);

    expect(async () => {
      await getProductUsecase.findOne('123');
    }).not.toThrow(Error);
  });
  test('findAll_findAllProducts_returnSuccess', async () => {
    const getProductUsecase = new GetProductUsecase(mockProductRepository);

    expect(async () => {
      await getProductUsecase.findAll();
    }).not.toThrow(Error);
  });
});
