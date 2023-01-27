import { createMock } from 'ts-auto-mock';
import { UpdateOrderUsecase } from '../../../../src/application/usecase/order/UpdateOrderUsecase';
import { OrderRepository } from '../../../../src/domain/checkout/repository/OrderRepository';
import { ValidationError } from '../../../../src/utils/errors/ValidationError';

describe('UpdateOrderUsecase tests', () => {
  const mockOrderRepository = createMock<OrderRepository>();
  it('update_whenOrderValid_returnSuccess', () => {
    const updateOrderUsecase = new UpdateOrderUsecase(mockOrderRepository);
    const input = {
      id: '123',
      customerId: '123',
      items: [
        {
          id: '123',
          price: 10,
          productId: '123',
          quantity: 3,
        },
      ],
    };
    expect(async () => {
      await updateOrderUsecase.update(input);
    }).not.toThrow(ValidationError);
  });
});
