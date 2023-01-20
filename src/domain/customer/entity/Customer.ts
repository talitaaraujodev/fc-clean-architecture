import { Address } from '../valueObject/Address';

export class Customer {
  private id: string;
  private name: string = '';
  private address!: Address;
  private active: number = 1;
  private rewardPoints: number = 0;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
    this.validate();
  }

  get getId(): string {
    return this.id;
  }

  get getName(): string {
    return this.name;
  }

  get getRewardPoints(): number {
    return this.rewardPoints;
  }

  validate() {
    if (this.id === '') {
      throw new Error('Id é um campo obrigatório');
    }
    if (this.name.length === 0) {
      throw new Error('Name é um campo obrigatório');
    }
  }

  changeName(name: string) {
    this.name = name;
    this.validate();
  }

  get getAddress(): Address {
    return this.address;
  }

  changeAddress(address: Address) {
    this.address = address;
  }

  get isActive(): number {
    return this.active;
  }

  activate() {
    if (this.address === undefined) {
      throw new Error('Address é um campo obrigatório para ativar um cliente');
    }
    this.active = 2;
  }

  deactivate() {
    this.active = 1;
  }

  addRewardPoints(points: number) {
    this.rewardPoints += points;
  }
}
