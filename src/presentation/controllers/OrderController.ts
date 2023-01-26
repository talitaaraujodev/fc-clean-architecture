import { Request, Response } from 'express';
import CreateOrderUsecase from '../../application/usecase/order/CreateOrderUsecase';
import GetOrderUsecase from '../../application/usecase/order/GetOrderUsecase';
import UpdateOrderUsecase from '../../application/usecase/order/UpdateOrderUsecase';
import { ValidationError } from '../../utils/errors/ValidationError';

export class OrderController {
  constructor() {}

  async create(request: Request, response: Response): Promise<Response> {
    try {
      const orderDto = {
        customerId: request.body.customerId,
        items: request.body.items.map((item: any) => ({
          productId: item.productId,
          price: item.price,
          quantity: item.quantity,
        })),
        total: request.body.total,
      };

      const order = await CreateOrderUsecase.create(orderDto);
      return response.json(order).status(201);
    } catch (e) {
      if (e instanceof ValidationError) {
        return response.status(e.httpCode).json({ message: e.message });
      }
      return response.json(e).status(500);
    }
  }

  async update(request: Request, response: Response): Promise<Response> {
    try {
      const orderUpdateDto = {
        id: request.params.id,
        customerId: request.body.name,
        items: request.body.items.map((item: any) => ({
          productId: item.productId,
          price: item.price,
          quantity: item.quantity,
        })),
        total: request.body.total,
      };
      const order = await UpdateOrderUsecase.update(orderUpdateDto);
      return response.json(order).status(200);
    } catch (e) {
      if (e instanceof ValidationError) {
        return response.status(e.httpCode).json({ message: e.message });
      }
      return response.json(e).status(500);
    }
  }

  async findAll(request: Request, response: Response): Promise<Response> {
    try {
      const orders = await GetOrderUsecase.findAll();
      return response.json(orders).status(200);
    } catch (e) {
      return response.json(e).status(500);
    }
  }

  async findOne(request: Request, response: Response): Promise<Response> {
    try {
      const id = request.params.id;
      const order = await GetOrderUsecase.findOne(id);
      return response.json(order).status(200);
    } catch (e) {
      return response.json(e).status(500);
    }
  }
}
