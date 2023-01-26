import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateProductUsecase } from '../../application/usecase/product/CreateProductUsecase';
import { GetProductUsecase } from '../../application/usecase/product/GetProductUsecase';
import { UpdateProductUsecase } from '../../application/usecase/product/UpdateProductUsecase';
import { ValidationError } from '../../utils/errors/ValidationError';

export class ProductController {
  constructor() {}

  async create(request: Request, response: Response): Promise<Response> {
    try {
      const productDto = {
        name: request.body.name,
        price: request.body.price,
      };
      const createProductUsecase: CreateProductUsecase = container.resolve(
        'CreateProductUsecase'
      );
      const product = await createProductUsecase.create(productDto);
      return response.json(product).status(201);
    } catch (e) {
      if (e instanceof ValidationError) {
        return response.status(e.httpCode).json({ message: e.message });
      }
      return response.json(e).status(500);
    }
  }

  async update(request: Request, response: Response): Promise<Response> {
    try {
      const productUpdateDto = {
        id: request.params.id,
        name: request.body.name,
        price: request.body.price,
      };
      const updateProductUsecase: UpdateProductUsecase = container.resolve(
        'UpdateProductUsecase'
      );
      const product = await updateProductUsecase.update(productUpdateDto);
      return response.json(product).status(200);
    } catch (e) {
      if (e instanceof ValidationError) {
        return response.status(e.httpCode).json({ message: e.message });
      }
      return response.json(e).status(500);
    }
  }

  async findAll(request: Request, response: Response): Promise<Response> {
    try {
      const getProductUsecase: GetProductUsecase =
        container.resolve('GetProductUsecase');
      const products = await getProductUsecase.findAll();
      return response.json(products).status(200);
    } catch (e) {
      return response.json(e).status(500);
    }
  }

  async findOne(request: Request, response: Response): Promise<Response> {
    try {
      const id = request.params.id;
      const getProductUsecase: GetProductUsecase =
        container.resolve('GetProductUsecase');
      const product = await getProductUsecase.findOne(id);
      return response.json(product).status(200);
    } catch (e) {
      return response.json(e).status(500);
    }
  }
}
