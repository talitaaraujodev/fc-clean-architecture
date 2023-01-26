import { container } from 'tsyringe';
import { Request, Response, Router } from 'express';
import { InjectionTokens } from './../../utils/InjectionTokens';
import { ProductRepositoryImpl } from '../../infrastructure/persistence/repositories/ProductRepositoryImpl';
import { ProductController } from '../../presentation/controllers/ProductController';
import { CreateProductUsecase } from './../../application/usecase/product/CreateProductUsecase';
import { GetProductUsecase } from './../../application/usecase/product/GetProductUsecase';
import { UpdateProductUsecase } from './../../application/usecase/product/UpdateProductUsecase';

export const productRoute = Router();

container.register(InjectionTokens.PRODUCT_PERSISTENCE_REPOSITORY, {
  useClass: ProductRepositoryImpl,
});
container.register(InjectionTokens.GET_PRODUCT_USECASE, {
  useClass: GetProductUsecase,
});
container.register(InjectionTokens.CREATE_PRODUCT_USECASE, {
  useClass: CreateProductUsecase,
});
container.register(InjectionTokens.UPDATE_PRODUCT_USECASE, {
  useClass: UpdateProductUsecase,
});
container.register(InjectionTokens.PRODUCT_CONTROLLER, {
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
