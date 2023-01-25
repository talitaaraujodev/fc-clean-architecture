import { inject } from 'tsyringe';
import { ProductRepositoryImpl } from '../../../infrastructure/persistence/repositories/ProductRepositoryImpl';
import { ProductRepository } from './../../../domain/product/repository/ProductRepository';
import {
  InputUpdateProductDto,
  OutputUpdateProductDto
} from './dto/UpdateProductDto';

class UpdateProductUsecase {
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
export default new UpdateProductUsecase(new ProductRepositoryImpl());
