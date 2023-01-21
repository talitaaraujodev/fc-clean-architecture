import { ProductEntity } from './ProductEntity';
import { OrderEntity } from './OrderEntity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('order_items')
export class OrderItemsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string | null;

  @Column()
  ordersId: string;

  @Column()
  productsId: string;

  @Column()
  quantity: number;

  @Column()
  price: number;

  @ManyToOne(() => OrderEntity, (orders) => orders.orderItems, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'ordersId', referencedColumnName: 'id' }])
  orders: OrderEntity;

  @ManyToOne(() => ProductEntity, (products) => products.orderItems, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'productsId', referencedColumnName: 'id' }])
  products: ProductEntity;
}
