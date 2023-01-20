import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { OrderEntity } from '../order/repository/typeorm/OrderEntity';
import { CustomerEntity } from '../customer/repository/typeorm/CustomerEntitiy';
import { AddressEntity } from '../customer/repository/typeorm/AddressEntity';
import { ProductEntity } from '../product/repository/typeorm/ProductEntity';
import { OrderItemsEntity } from '../order/repository/typeorm/OrderItemEntity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '123456',
  database: 'clean_architecture',
  synchronize: true,
  logging: true,
  entities: [
    ProductEntity,
    AddressEntity,
    CustomerEntity,
    OrderEntity,
    OrderItemsEntity,
  ],
});
