import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateCustomerUsecase } from '../../application/usecase/customer/CreateCustomerUsecase';
import { GetCustomerUsecase } from '../../application/usecase/customer/GetCustomerUsecase';
import { UpdateCustomerUsecase } from '../../application/usecase/customer/UpdateCustomerUsecase';
import { ValidationError } from '../../utils/errors/ValidationError';

export class CustomerController {
  constructor() {}

  async create(request: Request, response: Response): Promise<Response> {
    try {
      const customerDto = {
        name: request.body.name,
        address: {
          street: request.body.address.street,
          city: request.body.address.city,
          number: request.body.address.number,
          zip: request.body.address.zip,
        },
      };

      const createCustomerUsecase: CreateCustomerUsecase = container.resolve(
        'CreateCustomerUsecase'
      );

      const customer = await createCustomerUsecase.create(customerDto);
      return response.json(customer).status(201);
    } catch (e) {
      if (e instanceof ValidationError) {
        return response.status(e.httpCode).json({ message: e.message });
      }
      return response.json(e).status(500);
    }
  }

  async update(request: Request, response: Response): Promise<Response> {
    try {
      const customerDto = {
        id: request.params.id,
        name: request.body.name,
        address: {
          street: request.body.address.street,
          city: request.body.address.city,
          number: request.body.address.number,
          zip: request.body.address.zip,
        },
      };
      const updateCustomerUsecase: UpdateCustomerUsecase = container.resolve(
        'UpdateCustomerUsecase'
      );

      const customer = await updateCustomerUsecase.update(customerDto);
      return response.json(customer).status(200);
    } catch (e) {
      if (e instanceof ValidationError) {
        return response.status(e.httpCode).json({ message: e.message });
      }
      return response.json(e).status(500);
    }
  }

  async findAll(request: Request, response: Response): Promise<Response> {
    try {
      const getCustomerUsecase: GetCustomerUsecase =
        container.resolve('GetCustomerUsecase');

      const products = await getCustomerUsecase.findAll();
      return response.json(products).status(200);
    } catch (e) {
      return response.json(e).status(500);
    }
  }

  async findOne(request: Request, response: Response): Promise<Response> {
    try {
      const id = request.params.id;
      const getCustomerUsecase: GetCustomerUsecase =
        container.resolve('GetCustomerUsecase');

      const product = await getCustomerUsecase.findOne(id);
      return response.json(product).status(200);
    } catch (e) {
      return response.json(e).status(500);
    }
  }
}
