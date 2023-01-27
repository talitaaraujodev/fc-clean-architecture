import { createMock } from 'ts-auto-mock';
import { CreateOrderUsecase } from '../../../../src/application/usecase/order/CreateOrderUsecase';
import { OrderRepository } from '../../../../src/domain/checkout/repository/OrderRepository';
import { ValidationError } from '../../../../src/utils/errors/ValidationError';

describe('CreateOrderUsecase tests', () => {
  const mockOrderRepository = createMock<OrderRepository>();
  it('create_whenOrderValid_returnSuccess', () => {
    const createOrderUsecase = new CreateOrderUsecase(mockOrderRepository);
    const input = {
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
      await createOrderUsecase.create(input);
    }).not.toThrow(ValidationError);
  });

  it('create_whenCustomerIdEmpty_returnValidationError', async () => {
    const createOrderUsecase = new CreateOrderUsecase(mockOrderRepository);
    const input = {
      customerId: '',
      items: [
        {
          id: '123',
          price: 10,
          productId: '123',
          quantity: 3,
        },
      ],
    };
    await expect(createOrderUsecase.create(input)).rejects.toThrow(
      'CustomerId é um campo obrigatório'
    );
  });
  it('create_whenItemsEmpty_returnValidationError', async () => {
    const createOrderUsecase = new CreateOrderUsecase(mockOrderRepository);
    const input = {
      customerId: '123',
      items: [],
    };
    await expect(createOrderUsecase.create(input)).rejects.toThrow(
      'Items é um campo obrigatório'
    );
  });
  it('create_whenPriceIsEqualZero_returnValidationError', async () => {
    const createOrderUsecase = new CreateOrderUsecase(mockOrderRepository);
    const input = {
      customerId: '123',
      items: [
        {
          id: '123',
          price: 0,
          productId: '123',
          quantity: 3,
        },
      ],
    };
    await expect(createOrderUsecase.create(input)).rejects.toThrow(
      'Price deve ser maior que zero'
    );
  });
  it('create_whenProductIdEmpty_returnValidationError', async () => {
    const createOrderUsecase = new CreateOrderUsecase(mockOrderRepository);
    const input = {
      customerId: '123',
      items: [
        {
          id: '123',
          price: 10,
          productId: '',
          quantity: 3,
        },
      ],
    };
    await expect(createOrderUsecase.create(input)).rejects.toThrow(
      'ProductId é um campo obrigatório'
    );
  });
  it('create_whenQuantityIsEqualZero_returnValidationError', async () => {
    const createOrderUsecase = new CreateOrderUsecase(mockOrderRepository);
    const input = {
      customerId: '123',
      items: [
        {
          id: '123',
          price: 10,
          productId: '123',
          quantity: 0,
        },
      ],
    };
    await expect(createOrderUsecase.create(input)).rejects.toThrow(
      'Quantity deve ser maior que zero'
    );
  });
});
