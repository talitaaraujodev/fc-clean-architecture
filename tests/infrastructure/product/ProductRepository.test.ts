import { DataSource, Repository } from 'typeorm';
import { AddressEntity } from '../../../src/infrastructure/persistence/entities/AddressEntity';
import { CustomerEntity } from '../../../src/infrastructure/persistence/entities/CustomerEntitiy';
import { OrderEntity } from '../../../src/infrastructure/persistence/entities/OrderEntity';
import { OrderItemsEntity } from '../../../src/infrastructure/persistence/entities/OrderItemEntity';
import { ProductEntity } from '../../../src/infrastructure/persistence/entities/ProductEntity';

describe('ProductRepository tests', () => {
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
      id: '123',
      name: 'Product test',
      price: 10,
    });

    expect(product.name).toBe('Product test');
    expect(product.price).toBe(10);
    expect(product).toHaveProperty('id');
  });
  test('find_whenProductValid_returnSuccess', async () => {
    await productRepository.save({
      id: '123',
      name: 'Product test',
      price: 10,
    });
    const product: any = await productRepository.findOne({
      where: { id: '123' },
    });

    expect(product.name).toBe('Product test');
    expect(product.price).toBe(10);
    expect(product).toHaveProperty('id');
  });
  test('findAll_findAllProducts_returnSuccess', async () => {
    await productRepository.save({
      id: '123',
      name: 'Product test',
      price: 10,
    });
    const products: ProductEntity[] = await productRepository.find();

    expect(products).toBeTruthy();
    expect(products).toBeInstanceOf(Array);
  });

  test('update_whenProductValid_returnSuccess', async () => {
    await productRepository.save({
      id: '123',
      name: 'Product test',
      price: 10,
    });
    const product: any = await productRepository.findOne({
      where: { id: '123' },
    });

    const productEntityUpdate: any = await productRepository.save({
      id: product.id,
      name: 'Product test update',
      price: 10,
    });

    expect(product.name).not.toBe(productEntityUpdate.name);
    expect(productEntityUpdate).toHaveProperty('id');
  });
});
