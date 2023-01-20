import { CustomerEntity } from './CustomerEntitiy';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('addresses')
export class AddressEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  street: string;

  @Column()
  number: number;

  @Column()
  zip: string;

  @Column()
  city: string;

  @OneToMany(() => CustomerEntity, (customer) => customer.address)
  customers: CustomerEntity[];
}
