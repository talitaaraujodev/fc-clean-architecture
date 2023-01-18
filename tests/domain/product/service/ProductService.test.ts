import { Product } from '../../../../src/domain/product/entity/Product';
import { ProductService } from '../../../../src/domain/product/service/ProductService';

describe('Product service unit tests', () => {
  it('increasePrice_whenProductsIsValid_returnPriceChanged', () => {
    const product1 = new Product(1, 'Produto 1', 10);
    const product2 = new Product(1, 'Produto 1', 20);
    const products = [product1, product2];

    ProductService.increasePrice(products, 100);

    expect(product1.getPrice).toBe(20);
    expect(product2.getPrice).toBe(40);
  });
});
