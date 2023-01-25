import 'reflect-metadata';
import { container } from 'tsyringe';
import { Request, Response, Router } from 'express';
import { ProductRepositoryImpl } from '../../infrastructure/persistence/repositories/ProductRepositoryImpl';
import ProductController from '../../presentation/controllers/ProductController';

export const productRoute = Router();

container.register('ProductRepository', {
  useClass: ProductRepositoryImpl,
});
container.register('ProductController', {
  useClass: ProductController,
});
const productController: ProductController =
  container.resolve('ProductController');

productRoute.get('/products', async (request: Request, response: Response) => {
  return await productController.findAll(request, response);
});
productRoute.get(
  '/products/:id',
  async (request: Request, response: Response) => {
    return await productController.findOne(request, response);
  }
);
productRoute.post('/products', async (request: Request, response: Response) => {
  return await productController.create(request, response);
});
productRoute.put(
  '/products/:id',
  async (request: Request, response: Response) => {
    return await productController.update(request, response);
  }
);
