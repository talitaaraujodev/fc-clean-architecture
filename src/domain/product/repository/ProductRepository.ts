import { Product } from '../../../domain/product/model/Product';

export interface ProductRepository {
  create(product: Product): Promise<Product | null>;
  update(product: Product): Promise<Product | null>;
  find(id: string): Promise<Product | null>;
  findAll(): Promise<Product[] | null>;
}
