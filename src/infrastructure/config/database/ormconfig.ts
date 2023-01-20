import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { OrderEntity } from '../../order/repository/typeorm/OrderEntity';
import { CustomerEntity } from '../../customer/repository/typeorm/CustomerEntitiy';
import { AddressEntity } from '../../customer/repository/typeorm/AddressEntity';
import { ProductEntity } from '../../product/repository/typeorm/ProductEntity';
import { OrderItemsEntity } from '../../order/repository/typeorm/OrderItemEntity';
import env from '../env';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: env.dbHost,
  port: env.dbPort,
  username: env.dbUser,
  password: env.dbPassword,
  database: env.dbName,
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
