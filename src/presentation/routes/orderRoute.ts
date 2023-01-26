import { Request, Response, Router } from 'express';
import { container } from 'tsyringe';
import { OrderRepositoryImpl } from './../../infrastructure/persistence/repositories/OrderRepositoryImpl';
import { OrderController } from './../controllers/OrderController';

export const orderRoute = Router();

container.register('OrderRepository', {
  useClass: OrderRepositoryImpl,
});
container.register('OrderController', {
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
