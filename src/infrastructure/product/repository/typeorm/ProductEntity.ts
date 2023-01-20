import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn('increment')
  id: number | null;

  @Column()
  name: string;

  @Column()
  price: number;

  constructor(id: number | null, name: string, price: number) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
}
