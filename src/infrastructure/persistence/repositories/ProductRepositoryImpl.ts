import { Repository } from 'typeorm';
import { ProductEntity } from '../../../infrastructure/persistence/entities/ProductEntity';
import { AppDataSource } from '../../../infrastructure/config/database/ormconfig';
import { Product } from '../../../domain/product/model/Product';
import { ProductRepository } from '../../../domain/product/repository/IProductRepository';

export default class ProductRepositoryImpl implements ProductRepository {
  private readonly repository: Repository<ProductEntity> =
    AppDataSource.getRepository(ProductEntity);

  async create(product: Product): Promise<Product | null> {
    const productEntitySaved: any = await this.repository.save(
      new ProductEntity(null, product.getName, product.getPrice)
    );
    return new Product(
      productEntitySaved.id,
      product.getName,
      product.getPrice
    );
  }

  async find(id: string): Promise<Product> {
    const product: any = await this.repository.findOneBy({ id });
    return new Product(product.id, product.name, product.price);
  }

  async findAll(): Promise<Product[] | null> {
    return Object.assign(await this.repository.find()) as Product[];
  }

  async update(product: Product): Promise<Product | null> {
    await this.find(product.getId);
    const productEntityUpdate: any = await this.repository.save(
      new ProductEntity(product.getId, product.getName, product.getPrice)
    );
    return new Product(
      productEntityUpdate.id,
      product.getName,
      product.getPrice
    );
  }
}
