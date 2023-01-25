import { inject } from 'tsyringe';
import { ProductRepositoryImpl } from '../../../infrastructure/persistence/repositories/ProductRepositoryImpl';
import { Product } from './../../../domain/product/model/Product';
import { ProductRepository } from './../../../domain/product/repository/ProductRepository';
import {
  InputCreateProductDto,
  OutputCreateProductDto
} from './dto/CreateProductDto';

class CreateProductUsecase {
  constructor(
    @inject('ProductRepository')
    private readonly productRepository: ProductRepository
  ) {}

  async create(input: InputCreateProductDto): Promise<OutputCreateProductDto> {
    const product = Product.createToSaved(input.name, input.price);

    return await this.productRepository.create(product);
  }
}
export default new CreateProductUsecase(new ProductRepositoryImpl());
