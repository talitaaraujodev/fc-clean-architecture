import { Request, Response } from 'express';
import CreateProductUsecase from '../../application/usecase/product/CreateProductUsecase';
import GetProductUsecase from '../../application/usecase/product/GetProductUsecase';
import UpdateProductUsecase from '../../application/usecase/product/UpdateProductUsecase';
import { ValidationError } from '../../utils/errors/ValidationError';

export default class ProductController {
  constructor() {}

  async create(request: Request, response: Response): Promise<Response> {
    try {
      const productDto = {
        name: request.body.name,
        price: request.body.price,
      };

      const product = await CreateProductUsecase.create(productDto);
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
      const product = await UpdateProductUsecase.update(productUpdateDto);
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
      const products = await GetProductUsecase.findAll();
      return response.json(products).status(200);
    } catch (e) {
      return response.json(e).status(500);
    }
  }

  async findOne(request: Request, response: Response): Promise<Response> {
    try {
      const id = request.params.id;
      const product = await GetProductUsecase.findOne(id);
      return response.json(product).status(200);
    } catch (e) {
      return response.json(e).status(500);
    }
  }
}
