import { OrderEntity } from './../../../order/repository/typeorm/OrderEntity';
import { AddressEntity } from './AddressEntity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity('customers')
export class CustomerEntity {
  @PrimaryGeneratedColumn('increment')
  id: number | null;

  @Column()
  name: string;

  @ManyToOne(() => AddressEntity, (address) => address.customers)
  @JoinColumn({ name: 'addressId' })
  address: AddressEntity;

  @Column()
  active: number;

  @Column()
  rewardPoints: number;

  @OneToMany(() => OrderEntity, (order) => order.customer)
  @JoinColumn({ name: 'customerId' })
  orders: OrderEntity[];
}
