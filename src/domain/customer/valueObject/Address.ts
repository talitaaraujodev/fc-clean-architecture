// value object
export class Address {
  private street: string = '';
  private number: number = 0;
  private zip: string = '';
  private city: string = '';

  constructor(street: string, number: number, zip: string, city: string) {
    this.street = street;
    this.number = number;
    this.zip = zip;
    this.city = city;

    this.validate();
  }

  get getStreet(): string {
    return this.street;
  }

  get getNumber(): number {
    return this.number;
  }

  get getZip(): string {
    return this.zip;
  }

  get getCity(): string {
    return this.city;
  }

  validate() {
    if (this.street.length === 0) {
      throw new Error('Street é um campo obrigatório');
    }
    if (this.number === 0) {
      throw new Error('Number é um campo obrigatório');
    }
    if (this.zip.length === 0) {
      throw new Error('Zip é um campo obrigatório');
    }
    if (this.city.length === 0) {
      throw new Error('City é um campo obrigatório');
    }
  }

  toString() {
    return `${this.street}, ${this.number}, ${this.zip} ,${this.city}`;
  }
}
