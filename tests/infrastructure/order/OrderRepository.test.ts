import { AddressEntity } from '../../../src/infrastructure/customer/repository/typeorm/AddressEntity';
import { ProductEntity } from './../../../src/infrastructure/product/repository/typeorm/ProductEntity';
import { OrderEntity } from './../../../src/infrastructure/order/repository/typeorm/OrderEntity';
import { CustomerEntity } from './../../../src/infrastructure/customer/repository/typeorm/CustomerEntitiy';
import { DataSource, Repository } from 'typeorm';

describe('OrderRepository tests', () => {
  const TestDataSource = new DataSource({
    type: 'sqlite',
    database: ':memory:',
    dropSchema: true,
    entities: [AddressEntity, CustomerEntity, OrderEntity, ProductEntity],
    synchronize: true,
    logging: false,
  });

  let repositoryOrder: Repository<OrderEntity>;

  beforeAll(async () => {
    await TestDataSource.initialize();
    repositoryOrder = TestDataSource.getRepository(OrderEntity);
  });
  afterAll(async () => {
    await TestDataSource.destroy();
  });

  test('findAll_findAllCustomers_returnSuccess', async () => {
    const orders: OrderEntity[] = await repositoryOrder.find();

    expect(orders).toBeTruthy();
    expect(orders).toBeInstanceOf(Array);
  });
});
