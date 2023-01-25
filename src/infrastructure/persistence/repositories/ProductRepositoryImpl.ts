import { Repository } from 'typeorm';
import { Product } from '../../../domain/product/model/Product';
import { ProductRepository } from '../../../domain/product/repository/ProductRepository';
import { AppDataSource } from '../../../infrastructure/config/database/ormconfig';
import { ProductEntity } from '../../../infrastructure/persistence/entities/ProductEntity';

export  class ProductRepositoryImpl implements ProductRepository {
  private readonly repository: Repository<ProductEntity> =
    AppDataSource.getRepository(ProductEntity);

  async create(product: Product): Promise<Product> {
    const productEntitySaved: any = await this.repository.save(
      new ProductEntity(product.id, product.name, product.price)
    );
    return new Product(
      productEntitySaved.id,
      productEntitySaved.name,
      productEntitySaved.price
    );
  }

  async find(id: string): Promise<Product> {
    const product: any = await this.repository.findOneBy({ id });
    return new Product(product.id, product.name, product.price);
  }

  async findAll(): Promise<Product[]> {
    return Object.assign(await this.repository.find()) as Product[];
  }

  async update(product: Product): Promise<Product> {
    await this.find(product.id);
    const productEntityUpdate: any = await this.repository.save(
      new ProductEntity(product.id, product.name, product.price)
    );
    return new Product(productEntityUpdate.id, product.name, product.price);
  }
}
