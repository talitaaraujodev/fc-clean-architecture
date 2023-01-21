import { OrderItemsEntity } from './OrderItemEntity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string | null;

  @Column()
  name: string;

  @Column()
  price: number;

  @OneToMany(() => OrderItemsEntity, (orderItems) => orderItems.products)
  orderItems: OrderItemsEntity[];

  constructor(id: string | null, name: string, price: number) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
}
