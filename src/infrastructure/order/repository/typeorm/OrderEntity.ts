import { ProductEntity } from './../../../product/repository/typeorm/ProductEntity';
import { CustomerEntity } from '../../../customer/repository/typeorm/CustomerEntitiy';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity('orders')
export class OrderEntity {
  @PrimaryGeneratedColumn('increment')
  id: number | null;

  @ManyToOne(() => CustomerEntity, (customer) => customer.orders)
  customer: CustomerEntity;

  @Column()
  total: number;

  @ManyToMany(() => ProductEntity)
  @JoinTable({
    name: 'order_products',
  })
  products: ProductEntity[];
}
