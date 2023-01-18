import { Product } from '../entity/Product';

export interface IProductRepository {
  create(product: Product): Promise<Product | null>;
  update(product: Product): Promise<Product | null>;
  find(id: number): Promise<Product | null>;
  findAll(): Promise<Product[] | null>;
}
