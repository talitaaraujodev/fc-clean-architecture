import { v4 as uuid } from 'uuid';
import { Product } from '../../../../src/domain/product/model/Product';
import { ProductService } from '../../../../src/domain/product/service/ProductService';

describe('Product service unit tests', () => {
  test('increasePrice_whenProductsIsValid_returnPriceChanged', () => {
    const product1 = new Product(uuid(), 'Produto test 1', 10);
    const product2 = new Product(uuid(), 'Produto test 2', 20);
    const products = [product1, product2];

    ProductService.increasePrice(products, 100);

    expect(product1.price).toBe(20);
    expect(product2.price).toBe(40);
  });
});
