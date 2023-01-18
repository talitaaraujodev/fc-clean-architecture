import { AddressEntity } from './AddressEntity';
import { AppDataSource } from '../../../database/ormconfig';
import { IAddressRepository } from '../../../../domain/customer/repository/IAddressRepository';
import { Address } from 'domain/customer/valueObject/Address';

export class AddressRepository implements IAddressRepository {
  private readonly repository = AppDataSource.getRepository(AddressEntity);

  async create(address: Address): Promise<Address> {
    const addressEntitySaved: any = await this.repository.save({
      street: address.getStreet,
      number: address.getNumber,
      zip: address.getZip,
      city: address.getCity,
    });
    return new Address(
      addressEntitySaved.id,
      address.getStreet,
      address.getNumber,
      address.getZip,
      address.getCity
    );
  }

  async update(address: Address): Promise<Address> {
    await this.find(address.getId);
    const addressEntityUpdate: any = await this.repository.save({
      id: address.getId,
      street: address.getStreet,
      number: address.getNumber,
      zip: address.getZip,
      city: address.getCity,
    });
    return new Address(
      addressEntityUpdate.id,
      address.getStreet,
      address.getNumber,
      address.getZip,
      address.getCity
    );
  }

  async find(id: number): Promise<Address> {
    const address: any = await this.repository.findOneBy({ id });
    return new Address(
      address.id,
      address.getStreet,
      address.getNumber,
      address.getZip,
      address.getCity
    );
  }

  async findAll(): Promise<Address[]> {
    return Object.assign(await this.repository.find()) as Address[];
  }
}
