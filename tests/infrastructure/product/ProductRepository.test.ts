import { ProductEntity } from './../../../src/infrastructure/product/repository/typeorm/ProductEntity';
import { OrderEntity } from './../../../src/infrastructure/order/repository/typeorm/OrderEntity';
import { CustomerEntity } from './../../../src/infrastructure/customer/repository/typeorm/CustomerEntitiy';
import { AddressEntity } from '../../../src/infrastructure/customer/repository/typeorm/AddressEntity';
import { DataSource, Repository } from 'typeorm';

describe('ProductRepository tests', () => {
  const TestDataSource = new DataSource({
    type: 'sqlite',
    database: ':memory:',
    dropSchema: true,
    entities: [AddressEntity, CustomerEntity, OrderEntity, ProductEntity],
    synchronize: true,
    logging: false,
  });

  let productRepository: Repository<ProductEntity>;

  beforeAll(async () => {
    await TestDataSource.initialize();
    productRepository = TestDataSource.getRepository(ProductEntity);
  });
  afterAll(async () => {
    await TestDataSource.destroy();
  });

  test('create_whenProductValid_returnSuccess', async () => {
    const product = await productRepository.save({
      id: 1,
      name: 'Product test',
      price: 10,
    });

    expect(product.name).toBe('Product test');
    expect(product.price).toBe(10);
    expect(product).toHaveProperty('id');
  });
  test('find_whenProductValid_returnSuccess', async () => {
    await productRepository.save({
      id: 1,
      name: 'Product test',
      price: 10,
    });
    const product: any = await productRepository.findBy({ id: 1 });

    expect(product[0].name).toBe('Product test');
    expect(product[0].price).toBe(10);
    expect(product[0]).toHaveProperty('id');
  });
  test('findAll_findAllProducts_returnSuccess', async () => {
    await productRepository.save({
      id: 1,
      name: 'Product test',
      price: 10,
    });
    const products: ProductEntity[] = await productRepository.find();

    expect(products).toBeTruthy();
    expect(products).toBeInstanceOf(Array);
  });

  test('update_whenProductValid_returnSuccess', async () => {
    await productRepository.save({
      id: 1,
      name: 'Product test',
      price: 10,
    });
    const product: any = await productRepository.findBy({ id: 1 });

    const productEntityUpdate: any = await productRepository.save({
      id: product[0].id,
      name: 'Product test update',
      price: 10,
    });

    expect(product[0].name).not.toBe(productEntityUpdate.name);
    expect(productEntityUpdate).toHaveProperty('id');
  });
});
