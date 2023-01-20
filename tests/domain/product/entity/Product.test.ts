import { Product } from '../../../../src/domain/product/entity/Product';
import { v4 as uuid } from 'uuid';
describe('Product tests', () => {
  test('validate_whenNameEmpty_returnError', () => {
    expect(() => {
      const product = new Product(uuid(), '', 50);
    }).toThrowError('Name é um campo obrigatório');
  });
  test('validate_whenPriceInvalid_returnError', () => {
    expect(() => {
      const product = new Product(uuid(), 'Product test', -1);
    }).toThrowError('Price deve ser maior que zero');
  });
  test('changeName_whenNameToChange_returnName', () => {
    const product = new Product(uuid(), 'Product 1', 50);
    product.changeName('Product 2');
    expect(product.getName).toBe('Product 2');
  });
  test('changePrice_whenPriceToChange_returnPrice', () => {
    const product = new Product(uuid(), 'Product 1', 50);
    product.changePrice(100);
    expect(product.getPrice).toBe(100);
  });
});
