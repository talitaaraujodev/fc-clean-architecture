/* eslint-disable @typescript-eslint/no-unused-vars */
import { v4 as uuid } from 'uuid';
import { Product } from '../../../../src/domain/product/model/Product';
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
    const product = new Product(uuid(), 'Product test', 50);
    product.changeName('Product test 2');
    expect(product.name).toBe('Product 2');
  });
  test('changePrice_whenPriceToChange_returnPrice', () => {
    const product = new Product(uuid(), 'Product test', 50);
    product.changePrice(100);
    expect(product.price).toBe(100);
  });
});
