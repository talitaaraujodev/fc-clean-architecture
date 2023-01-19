import { ProductEntity } from './../../../src/infrastructure/product/repository/typeorm/ProductEntity';
import { OrderEntity } from './../../../src/infrastructure/order/repository/typeorm/OrderEntity';
import { CustomerEntity } from './../../../src/infrastructure/customer/repository/typeorm/CustomerEntitiy';
import { AddressEntity } from '../../../src/infrastructure/address/repository/typeorm/AddressEntity';
import { DataSource } from 'typeorm';

describe('AddressRepository tests', () => {
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

  it('save_whenAddressValid_returnSuccess', async () => {
    const repository = TestDataSource.getRepository(AddressEntity);

    const address = await repository.save({
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
  it('find_whenAddressValid_returnSuccess', async () => {
    const repository = TestDataSource.getRepository(AddressEntity);

    await repository.save({
      id: 1,
      street: 'Rua ABC',
      number: 123,
      zip: '15220-250',
      city: 'São Paulo',
    });
    const address: any = await repository.findBy({ id: 1 });

    expect(address[0].street).toBe('Rua ABC');
    expect(address[0].number).toBe(123);
    expect(address[0]).toHaveProperty('zip');
    expect(address[0].city).toBe('São Paulo');
  });
  it('findAll_ findAllAdresses_returnSuccess', async () => {
    const repository = TestDataSource.getRepository(AddressEntity);

    await repository.save({
      id: 1,
      street: 'Rua ABC',
      number: 123,
      zip: '15220-250',
      city: 'São Paulo',
    });
    const addresses: AddressEntity[] = await repository.find();

    expect(addresses).toBeTruthy();
    expect(addresses).toBeInstanceOf(Array);
  });

  test('update_whenAddressValid_returnSuccess', async () => {
    const repository = TestDataSource.getRepository(AddressEntity);

    await repository.save({
      id: 1,
      street: 'Rua ABC',
      number: 123,
      zip: '15220-250',
      city: 'São Paulo',
    });
    const address: any = await repository.findBy({ id: 1 });

    const addressEntityUpdate: any = await repository.save({
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
