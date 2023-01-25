import { Product } from '../../../domain/product/model/Product';

export interface ProductRepository {
  create(product: Product): Promise<Product>;
  update(product: Product): Promise<Product>;
  find(id: string): Promise<Product>;
  findAll(): Promise<Product[]>;
}
