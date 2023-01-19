import { ProductEntity } from './../../../src/infrastructure/product/repository/typeorm/ProductEntity';
import { OrderEntity } from './../../../src/infrastructure/order/repository/typeorm/OrderEntity';
import { CustomerEntity } from './../../../src/infrastructure/customer/repository/typeorm/CustomerEntitiy';
import { AddressEntity } from '../../../src/infrastructure/address/repository/typeorm/AddressEntity';
import { DataSource } from 'typeorm';

describe('ProductRepository tests', () => {
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

  test('save_whenProductValid_returnSuccess', async () => {
    const repository = TestDataSource.getRepository(ProductEntity);

    const product = await repository.save({
      id: 1,
      name: 'Product test',
      price: 10,
    });

    expect(product.name).toBe('Product test');
    expect(product.price).toBe(10);
    expect(product).toHaveProperty('id');
  });
  test('find_whenProductValid_returnSuccess', async () => {
    const repository = TestDataSource.getRepository(ProductEntity);

    await repository.save({
      id: 1,
      name: 'Product test',
      price: 10,
    });
    const product: any = await repository.findBy({ id: 1 });

    expect(product[0].name).toBe('Product test');
    expect(product[0].price).toBe(10);
    expect(product[0]).toHaveProperty('id');
  });
  test('findAll_ findAllProducts_returnSuccess', async () => {
    const repository = TestDataSource.getRepository(ProductEntity);

    await repository.save({
      id: 1,
      name: 'Product test',
      price: 10,
    });
    const products: ProductEntity[] = await repository.find();

    expect(products).toBeTruthy();
    expect(products).toBeInstanceOf(Array);
  });

  test('update_whenProductValid_returnSuccess', async () => {
    const repository = TestDataSource.getRepository(ProductEntity);

    await repository.save({
      id: 1,
      name: 'Product test',
      price: 10,
    });
    const product: any = await repository.findBy({ id: 1 });

    const productEntityUpdate: any = await repository.save({
      id: product[0].id,
      name: 'Product test update',
      price: 10,
    });

    expect(product[0].name).not.toBe(productEntityUpdate.name);
    expect(productEntityUpdate).toHaveProperty('id');
  });
});
