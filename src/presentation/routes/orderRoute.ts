import { container } from 'tsyringe';
import { Request, Response, Router } from 'express';
import { CreateOrderUsecase } from './../../application/usecase/order/CreateOrderUsecase';
import { GetOrderUsecase } from './../../application/usecase/order/GetOrderUsecase';
import { UpdateOrderUsecase } from './../../application/usecase/order/UpdateOrderUsecase';
import { OrderRepositoryImpl } from './../../infrastructure/persistence/repositories/OrderRepositoryImpl';
import { InjectionTokens } from './../../utils/InjectionTokens';
import { OrderController } from './../controllers/OrderController';

export const orderRoute = Router();

container.register(InjectionTokens.ORDER_PERSISTENCE_REPOSITORY, {
  useClass: OrderRepositoryImpl,
});
container.register(InjectionTokens.GET_ORDER_USECASE, {
  useClass: GetOrderUsecase,
});
container.register(InjectionTokens.CREATE_ORDER_USECASE, {
  useClass: CreateOrderUsecase,
});
container.register(InjectionTokens.UPDATE_ORDER_USECASE, {
  useClass: UpdateOrderUsecase,
});
container.register(InjectionTokens.ORDER_CONTROLLER, {
  useClass: OrderController,
});
const orderController: OrderController = container.resolve('OrderController');

orderRoute.get('/orders', async (request: Request, response: Response) => {
  return await orderController.findAll(request, response);
});
orderRoute.get('/orders/:id', async (request: Request, response: Response) => {
  return await orderController.findOne(request, response);
});
orderRoute.post('/orders', async (request: Request, response: Response) => {
  return await orderController.create(request, response);
});
orderRoute.put('/orders/:id', async (request: Request, response: Response) => {
  return await orderController.update(request, response);
});
