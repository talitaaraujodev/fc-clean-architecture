import { v4 as uuid } from 'uuid';
import { ValidationError } from '../../../utils/errors/ValidationError';
import { Address } from '../valueObject/Address';
export class Customer {
  private _id: string;
  private _name: string = '';
  private _address!: Address;
  private _active: number = 1;
  private _rewardPoints: number = 0;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
    this.validate();
  }

  static createToSaved(name: string, address: Address): Customer {
    const customer = new Customer(uuid(), name);
    customer.changeAddress(address);
    return customer;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }

  validate() {
    if (this.id.length === 0) {
      throw new ValidationError('Id é um campo obrigatório');
    }
    if (this.name.length === 0) {
      throw new ValidationError('Name é um campo obrigatório');
    }
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  get address(): Address {
    return this._address;
  }

  changeAddress(address: Address) {
    this._address = address;
  }

  get isActive(): number {
    return this._active;
  }

  activate() {
    if (this._address === undefined) {
      throw new ValidationError(
        'Address é um campo obrigatório para ativar um cliente'
      );
    }
    this._active = 2;
  }

  deactivate() {
    this._active = 1;
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points;
  }
}
