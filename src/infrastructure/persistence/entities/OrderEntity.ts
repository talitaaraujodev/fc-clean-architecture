import { OrderItemsEntity } from './OrderItemEntity';
import { CustomerEntity } from './CustomerEntitiy';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity('orders')
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => CustomerEntity, (address) => address.orders)
  @JoinColumn({ name: 'customerId' })
  customer: CustomerEntity;

  @OneToMany(() => OrderItemsEntity, (orderItems) => orderItems.orders)
  orderItems: OrderItemsEntity[];

  @Column()
  total: number;
}
