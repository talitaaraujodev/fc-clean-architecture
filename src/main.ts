import 'reflect-metadata';
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

const customer = new Customer(123, 'Customer Test');
const address = new Address(1, 'Rua ABC', 100, '19016-120', 'Sergipe');

customer.changeAddress(address);
customer.activate();

const item1 = new OrderItem(1, 20, 1, 5);
const item2 = new OrderItem(2, 30, 2, 7);

const order = new Order(1, 123, [item1, item2]);
