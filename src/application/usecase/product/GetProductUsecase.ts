import { inject } from 'tsyringe';
import { Product } from './../../../domain/product/model/Product';
import { ProductRepositoryImpl } from '../../../infrastructure/persistence/repositories/ProductRepositoryImpl';
import { ProductRepository } from './../../../domain/product/repository/ProductRepository';
import {
  OutputFindOneProductDto,
  OutputListProductDto,
} from './dto/GetProductDto';

class GetProductUsecase {
  constructor(
    @inject('ProductRepository')
    private readonly productRepository: ProductRepository
  ) {}

  async findOne(id: string): Promise<OutputFindOneProductDto> {
    const product = await this.productRepository.find(id);
    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }

  async findAll(): Promise<OutputListProductDto> {
    const products: Product[] = await this.productRepository.findAll();

    return {
      products: products.map((product: any) => ({
        id: product.id,
        name: product.name,
        price: product.price,
      })),
    };
  }
}
export default new GetProductUsecase(new ProductRepositoryImpl());
