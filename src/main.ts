import 'reflect-metadata';
import { v4 as uuid } from 'uuid';
import { AppDataSource } from './infrastructure/database/ormconfig';

import { Address } from './domain/customer/valueObject/Address';
import { Customer } from './domain/customer/entity/Customer';
import { Order } from './domain/checkout/entity/Order';
import { OrderItem } from './domain/checkout/entity/OrderItem';

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });

const customer = new Customer(uuid(), 'Customer Test');
const address = new Address('Rua ABC', 100, '19016-120', 'Sergipe');

customer.changeAddress(address);
customer.activate();

const item1 = new OrderItem(uuid(), 20, uuid(), 5);
const item2 = new OrderItem(uuid(), 30, uuid(), 7);

const order = new Order(uuid(), uuid(), [item1, item2]);
