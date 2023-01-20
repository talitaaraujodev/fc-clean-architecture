import { Address } from '../../../../src/domain/customer/valueObject/Address';
describe('Address tests', () => {
  test('validate_whenStreetEmpty_returnError', () => {
    expect(() => {
      const address = new Address('', 123, '15220-250', 'São Paulo');
    }).toThrowError('Street é um campo obrigatório');
  });
  test('validate_whenNumberEmpty_returnError', () => {
    expect(() => {
      const address = new Address('Rua ABC', 0, '15220-250', 'São Paulo');
    }).toThrowError('Number é um campo obrigatório');
  });
  test('validate_whenZipEmpty_returnError', () => {
    expect(() => {
      const address = new Address('Rua ABC', 123, '', 'São Paulo');
    }).toThrowError('Zip é um campo obrigatório');
  });
  test('validate_whenCityEmpty_returnError', () => {
    expect(() => {
      const address = new Address('Rua ABC', 123, '15220-250', '');
    }).toThrowError('City é um campo obrigatório');
  });
});
