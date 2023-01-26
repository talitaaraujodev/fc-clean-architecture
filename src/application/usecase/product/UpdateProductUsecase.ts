import { inject, injectable } from 'tsyringe';
import { ProductRepository } from './../../../domain/product/repository/ProductRepository';
import {
  InputUpdateProductDto,
  OutputUpdateProductDto,
} from './dto/UpdateProductDto';
@injectable()
export class UpdateProductUsecase {
  constructor(
    @inject('ProductRepository')
    private readonly productRepository: ProductRepository
  ) {}

  async update(input: InputUpdateProductDto): Promise<OutputUpdateProductDto> {
    const product = await this.productRepository.find(input.id);

    product.changeName(input.name);
    product.changePrice(input.price);

    await this.productRepository.update(product);

    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
}
