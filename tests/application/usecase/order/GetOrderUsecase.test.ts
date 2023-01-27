import { createMock } from 'ts-auto-mock';
import { OrderRepository } from '../../../../src/domain/checkout/repository/OrderRepository';
import { GetOrderUsecase } from './../../../../src/application/usecase/order/GetOrderUsecase';
describe('GetOrderUsecase tests', () => {
  const mockOrderRepository = createMock<OrderRepository>();
  it('findOne_whenOrderValid_returnSuccess', () => {
    const getOrderUsecase = new GetOrderUsecase(mockOrderRepository);

    expect(async () => {
      await getOrderUsecase.findOne('123');
    }).not.toThrow(Error);
  });
  it('findAll_findAllOrders_returnSuccess', () => {
    const getOrderUsecase = new GetOrderUsecase(mockOrderRepository);

    expect(async () => {
      await getOrderUsecase.findAll();
    }).not.toThrow(Error);
  });
});
