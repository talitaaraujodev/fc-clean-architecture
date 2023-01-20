import { ProductEntity } from 'infrastructure/product/repository/typeorm/ProductEntity';
import { AppDataSource } from 'infrastructure/database/ormconfig';
import { Product } from '../../../../domain/product/entity/Product';
import { IProductRepository } from '../../../../domain/product/repository/IProductRepository';
import { Repository } from 'typeorm';

export default class ProductRepository implements IProductRepository {
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
