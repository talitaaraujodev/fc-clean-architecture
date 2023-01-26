import { container } from 'tsyringe';
import { Request, Response, Router } from 'express';
import { CustomerController } from '../controllers/CustomerController';
import { CustomerRepositoryImpl } from './../../infrastructure/persistence/repositories/CustomerRepositoryImpl';
import { GetCustomerUsecase } from '../../application/usecase/customer/GetCustomerUsecase';
import { CreateCustomerUsecase } from '../../application/usecase/customer/CreateCustomerUsecase';
import { UpdateCustomerUsecase } from '../../application/usecase/customer/UpdateCustomerUsecase';
import { InjectionTokens } from './../../utils/InjectionTokens';

export const customerRoute = Router();

container.register(InjectionTokens.CUSTOMER_PERSISTENCE_REPOSITORY, {
  useClass: CustomerRepositoryImpl,
});
container.register(InjectionTokens.GET_CUSTOMER_USECASE, {
  useClass: GetCustomerUsecase,
});
container.register(InjectionTokens.CREATE_CUSTOMER_USECASE, {
  useClass: CreateCustomerUsecase,
});
container.register(InjectionTokens.UPDATE_CUSTOMER_USECASE, {
  useClass: UpdateCustomerUsecase,
});
container.register(InjectionTokens.CUSTOMER_CONTROLLER, {
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
