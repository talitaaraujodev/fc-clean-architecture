import { CustomerRepositoryImpl } from './../../infrastructure/persistence/repositories/CustomerRepositoryImpl';
import 'reflect-metadata';
import { container } from 'tsyringe';
import { Request, Response, Router } from 'express';
import CustomerController from '../controllers/CustomerController';
import { CustomerUsecase } from '../../application/usecase/customer/CustomerUsecase';
export const customerRoute = Router();

container.register('CustomerRepository', {
  useClass: CustomerRepositoryImpl,
});
container.register('CustomerUseCaseInput', {
  useClass: CustomerUsecase,
});
container.register('CustomerController', {
  useClass: CustomerController,
});
const customerController: CustomerController =
  container.resolve('CustomerController');

customerRoute.get(
  '/customers',
  async (request: Request, response: Response) => {
    return await customerController.findAll(request, response);
  }
);
customerRoute.get(
  '/customers/:id',
  async (request: Request, response: Response) => {
    return await customerController.findOne(request, response);
  }
);
customerRoute.post(
  '/customers',
  async (request: Request, response: Response) => {
    return await customerController.create(request, response);
  }
);
customerRoute.put(
  '/customers/:id',
  async (request: Request, response: Response) => {
    return await customerController.update(request, response);
  }
);
