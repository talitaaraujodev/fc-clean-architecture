import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('order_products')
export class OrderProductsEntity {
  @PrimaryGeneratedColumn('increment')
  id: number | null;

  @Column()
  order_id: number;

  @Column()
  product_id: number;

  @Column()
  quantidade: number;

  constructor(
    id: number | null,
    order_id: number,
    product_id: number,
    quantidade: number
  ) {
    this.id = id;
    this.order_id = order_id;
    this.product_id = product_id;
    this.quantidade = quantidade;
  }
}
