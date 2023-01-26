import { inject, injectable } from 'tsyringe';
import { Product } from './../../../domain/product/model/Product';
import { ProductRepository } from './../../../domain/product/repository/ProductRepository';
import {
  InputCreateProductDto,
  OutputCreateProductDto,
} from './dto/CreateProductDto';

@injectable()
export class CreateProductUsecase {
  constructor(
    @inject('ProductRepository')
    private readonly productRepository: ProductRepository
  ) {}

  async create(input: InputCreateProductDto): Promise<OutputCreateProductDto> {
    const product = Product.createToSaved(input.name, input.price);

    return await this.productRepository.create(product);
  }
}
