import { AddressEntity } from '../../../src/infrastructure/customer/repository/typeorm/AddressEntity';
import { ProductEntity } from './../../../src/infrastructure/product/repository/typeorm/ProductEntity';
import { OrderEntity } from './../../../src/infrastructure/order/repository/typeorm/OrderEntity';
import { CustomerEntity } from './../../../src/infrastructure/customer/repository/typeorm/CustomerEntitiy';
import { DataSource, Repository } from 'typeorm';

describe('CustomerRepository tests', () => {
  const TestDataSource = new DataSource({
    type: 'sqlite',
    database: ':memory:',
    dropSchema: true,
    entities: [AddressEntity, CustomerEntity, OrderEntity, ProductEntity],
    synchronize: true,
    logging: false,
  });

  let repositoryCustomer: Repository<CustomerEntity>;
  let repositoryAddress: Repository<AddressEntity>;

  beforeAll(async () => {
    await TestDataSource.initialize();
    repositoryCustomer = TestDataSource.getRepository(CustomerEntity);
    repositoryAddress = TestDataSource.getRepository(AddressEntity);
  });
  afterAll(async () => {
    await TestDataSource.destroy();
  });

  test('create_whenCustomerValid_returnSuccess', async () => {
    await repositoryAddress.save({
      id: 1,
      street: 'Rua ABC',
      number: 123,
      zip: '15220-250',
      city: 'São Paulo',
    });
    const customer = await repositoryCustomer.save({
      id: 1,
      name: 'Customer test',
      active: 2,
      rewardPoints: 0,
      addressId: 1,
    });

    expect(customer.name).toBe('Customer test');
    expect(customer).toHaveProperty('id');
  });
  test('find_whenCustomerValid_returnSuccess', async () => {
    const repositoryCustomer = TestDataSource.getRepository(CustomerEntity);
    const repositoryAddress = TestDataSource.getRepository(AddressEntity);

    await repositoryAddress.save({
      id: 1,
      street: 'Rua ABC',
      number: 123,
      zip: '15220-250',
      city: 'São Paulo',
    });

    await repositoryCustomer.save({
      id: 1,
      name: 'Customer test',
      active: 2,
      rewardPoints: 0,
      addressId: 1,
    });
    const customer: any = await repositoryCustomer.findBy({ id: 1 });

    expect(customer[0].name).toBe('Customer test');
    expect(customer[0]).toHaveProperty('id');
  });
  test('findAll_findAllCustomers_returnSuccess', async () => {
    const repositoryCustomer = TestDataSource.getRepository(CustomerEntity);
    const repositoryAddress = TestDataSource.getRepository(AddressEntity);

    await repositoryAddress.save({
      id: 1,
      street: 'Rua ABC',
      number: 123,
      zip: '15220-250',
      city: 'São Paulo',
    });

    await repositoryCustomer.save({
      id: 1,
      name: 'Customer test',
      active: 2,
      rewardPoints: 0,
      addressId: 1,
    });
    const customers: CustomerEntity[] = await repositoryCustomer.find();

    expect(customers).toBeTruthy();
    expect(customers).toBeInstanceOf(Array);
  });

  test('update_whenCustomerValid_returnSuccess', async () => {
    const repositoryCustomer = TestDataSource.getRepository(CustomerEntity);
    const repositoryAddress = TestDataSource.getRepository(AddressEntity);

    await repositoryAddress.save({
      id: 1,
      street: 'Rua ABC',
      number: 123,
      zip: '15220-250',
      city: 'São Paulo',
    });

    await repositoryCustomer.save({
      id: 1,
      name: 'Customer test',
    });
    const customer: any = await repositoryCustomer.findBy({ id: 1 });

    const customerEntityUpdate: any = await repositoryCustomer.save({
      id: customer[0].id,
      name: 'Customer test update',
    });

    expect(customer[0].name).not.toBe(customerEntityUpdate.name);
    expect(customerEntityUpdate).toHaveProperty('id');
  });
  test('createAddress_whenAddressValid_returnSuccess', async () => {
    const repositoryAddress = TestDataSource.getRepository(AddressEntity);

    const address = await repositoryAddress.save({
      id: 1,
      street: 'Rua ABC',
      number: 123,
      zip: '15220-250',
      city: 'São Paulo',
    });

    expect(address.street).toBe('Rua ABC');
    expect(address.number).toBe(123);
    expect(address).toHaveProperty('zip');
    expect(address.city).toBe('São Paulo');
  });
  test('updateAddress_whenAddressValid_returnSuccess', async () => {
    const repositoryAddress = TestDataSource.getRepository(AddressEntity);

    await repositoryAddress.save({
      id: 1,
      street: 'Rua ABC',
      number: 123,
      zip: '15220-250',
      city: 'São Paulo',
    });
    const address: any = await repositoryAddress.findBy({ id: 1 });

    const addressEntityUpdate: any = await repositoryAddress.save({
      id: address[0].id,
      street: 'Rua ABC',
      number: 123,
      zip: '15220-250',
      city: 'Fortaleza',
    });

    expect(address[0].city).not.toBe(addressEntityUpdate.city);
    expect(addressEntityUpdate).toHaveProperty('zip');
  });
});
