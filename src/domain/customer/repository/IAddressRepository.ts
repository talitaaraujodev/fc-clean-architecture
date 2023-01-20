import { Address } from '../valueObject/Address';

export interface IAddressRepository {
  create(address: Address): Promise<Address>;
  update(address: Address): Promise<Address>;
  find(id: number): Promise<Address>;
  findAll(): Promise<Address[]>;
}
