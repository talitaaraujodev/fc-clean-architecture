import { DataSource, Repository } from 'typeorm';
import { Order } from '../../../src/domain/checkout/model/Order';
import { OrderItem } from '../../../src/domain/checkout/model/OrderItem';
import { AddressEntity } from '../../../src/infrastructure/persistence/entities/AddressEntity';
import { CustomerEntity } from '../../../src/infrastructure/persistence/entities/CustomerEntitiy';
import { OrderEntity } from '../../../src/infrastructure/persistence/entities/OrderEntity';
import { OrderItemsEntity } from '../../../src/infrastructure/persistence/entities/OrderItemEntity';
import { ProductEntity } from '../../../src/infrastructure/persistence/entities/ProductEntity';

describe('OrderRepository tests', () => {
  const TestDataSource = new DataSource({
    type: 'sqlite',
    database: ':memory:',
    dropSchema: true,
    entities: [
      AddressEntity,
      CustomerEntity,
      OrderEntity,
      OrderItemsEntity,
      ProductEntity,
    ],
    synchronize: true,
    logging: false,
  });

  let repositoryOrder: Repository<OrderEntity>;
  let repositoryCustomer: Repository<CustomerEntity>;
  let repositoryAddress: Repository<AddressEntity>;

  beforeAll(async () => {
    await TestDataSource.initialize();
    repositoryOrder = TestDataSource.getRepository(OrderEntity);
    repositoryCustomer = TestDataSource.getRepository(CustomerEntity);
    repositoryAddress = TestDataSource.getRepository(AddressEntity);
  });
  afterAll(async () => {
    await TestDataSource.destroy();
  });
  test('create_whenOrderValid_returnSuccess', async () => {
    await repositoryAddress.save({
      id: '1',
      street: 'Street test',
      number: 123,
      zip: 'Zip test',
      city: 'City test',
    });
    await repositoryCustomer.save({
      id: '1',
      name: 'Customer test',
      active: 2,
      rewardPoints: 0,
    });
    const item = new OrderItem('1', 50, '1', 2);
    const order = new Order('1', '1', [item]);

    const orderEntitySaved = await repositoryOrder.save({
      id: '1',
      total: order.total,
      orderItems: order.items.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        price: item.price,
        ordersId: order.id,
        productsId: item.id,
      })),
      customer: { id: order.customerId },
    });

    expect(orderEntitySaved.customer.id).toBe('1');
    expect(orderEntitySaved.orderItems).toBeInstanceOf(Array);
    expect(orderEntitySaved.total).toBe(100);
  });
  test('update_whenProductValid_returnSuccess', async () => {
    await repositoryAddress.save({
      id: '1',
      street: 'Street test',
      number: 123,
      zip: 'Zip test',
      city: 'City test',
    });
    await repositoryCustomer.save({
      id: '1',
      name: 'Customer test',
      active: 2,
      rewardPoints: 0,
    });
    const item = new OrderItem('1', 50, '1', 2);
    const order = new Order('1', '1', [item]);

    await repositoryOrder.save({
      id: '1',
      total: order.total,
      orderItems: order.items.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        price: item.price,
        ordersId: order.id,
        productsId: item.id,
      })),
      customer: { id: order.customerId },
    });
    const findOrder: any = await repositoryOrder.findOne({
      where: { id: '1' },
    });

    const orderEntityUpdate: any = await repositoryOrder.save({
      id: findOrder.id,
      total: 300,
      orderItems: order.items.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        price: item.price,
        ordersId: order.id,
        productsId: item.id,
      })),
      customer: { id: order.customerId },
    });

    expect(findOrder.total).not.toBe(orderEntityUpdate.total);
    expect(orderEntityUpdate).toHaveProperty('id');
  });
  test('find_whenOrderValid_returnSuccess', async () => {
    await repositoryAddress.save({
      id: '1',
      street: 'Street test',
      number: 123,
      zip: 'Zip test',
      city: 'City test',
    });
    await repositoryCustomer.save({
      id: '1',
      name: 'Customer test',
      active: 2,
      rewardPoints: 0,
    });
    const item = new OrderItem('1', 50, '1', 2);
    const order = new Order('1', '1', [item]);

    await repositoryOrder.save({
      id: '1',
      total: order.total,
      orderItems: order.items.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        price: item.price,
        ordersId: order.id,
        productsId: item.id,
      })),
      customer: { id: order.customerId },
    });

    const findOrder: any = await repositoryOrder.findOne({
      where: { id: '1' },
    });

    expect(findOrder.total).toBe(100);
    expect(findOrder).toHaveProperty('id');
  });
  test('findAll_findAllCustomers_returnSuccess', async () => {
    const orders: OrderEntity[] = await repositoryOrder.find();

    expect(orders).toBeTruthy();
    expect(orders).toBeInstanceOf(Array);
  });
});
