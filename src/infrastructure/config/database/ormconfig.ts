import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { OrderEntity } from '../../persistence/entities/OrderEntity';
import { CustomerEntity } from '../../persistence/entities/CustomerEntitiy';
import { AddressEntity } from '../../persistence/entities/AddressEntity';
import { ProductEntity } from '../../persistence/entities/ProductEntity';
import { OrderItemsEntity } from '../../persistence/entities/OrderItemEntity';
import env from '../envConfig';

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
