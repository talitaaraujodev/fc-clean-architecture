import { AddressEntity } from './../../../src/infrastructure/address/repository/typeorm/AddressEntity';
import { ProductEntity } from './../../../src/infrastructure/product/repository/typeorm/ProductEntity';
import { OrderEntity } from './../../../src/infrastructure/order/repository/typeorm/OrderEntity';
import { CustomerEntity } from './../../../src/infrastructure/customer/repository/typeorm/CustomerEntitiy';
import { DataSource } from 'typeorm';

describe('OrderRepository tests', () => {
  const TestDataSource = new DataSource({
    type: 'sqlite',
    database: ':memory:',
    dropSchema: true,
    entities: [AddressEntity, CustomerEntity, OrderEntity, ProductEntity],
    synchronize: true,
    logging: false,
  });

  beforeAll(async () => {
    await TestDataSource.initialize();
  });
  afterAll(async () => {
    await TestDataSource.destroy();
  });

  test('findAll_findAllCustomers_returnSuccess', async () => {
    const repositoryOrder = TestDataSource.getRepository(OrderEntity);
    const orders: OrderEntity[] = await repositoryOrder.find();

    expect(orders).toBeTruthy();
    expect(orders).toBeInstanceOf(Array);
  });
});
