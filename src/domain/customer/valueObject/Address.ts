export class Address {
  private _street: string = '';
  private _number: number = 0;
  private _zip: string = '';
  private _city: string = '';

  constructor(street: string, number: number, zip: string, city: string) {
    this._street = street;
    this._number = number;
    this._zip = zip;
    this._city = city;

    this.validate();
  }

  get street(): string {
    return this._street;
  }

  get number(): number {
    return this._number;
  }

  get zip(): string {
    return this._zip;
  }

  get city(): string {
    return this._city;
  }

  validate() {
    if (this._street.length === 0) {
      throw new Error('Street é um campo obrigatório');
    }
    if (this._number === 0) {
      throw new Error('Number é um campo obrigatório');
    }
    if (this._zip.length === 0) {
      throw new Error('Zip é um campo obrigatório');
    }
    if (this._city.length === 0) {
      throw new Error('City é um campo obrigatório');
    }
  }

  toString() {
    return `${this._street}, ${this._number}, ${this._zip} ,${this._city}`;
  }
}
