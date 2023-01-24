import { Request, Response } from 'express';
import { ValidationError } from '../../utils/errors/ValidationError';
import GetCustomerUsecase from '../../application/usecase/customer/GetCustomerUsecase';
import UpdateCustomerUsecase from '../../application/usecase/customer/UpdateCustomerUsecase';
import CreateCustomerUsecase from '../../application/usecase/customer/CreateCustomerUsecase';

export default class CustomerController {
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

      const customer = await CreateCustomerUsecase.create(customerDto);
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
      const customer = await UpdateCustomerUsecase.update(customerDto);
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
      const products = await GetCustomerUsecase.findAll();
      return response.json(products).status(200);
    } catch (e) {
      return response.json(e).status(500);
    }
  }

  async findOne(request: Request, response: Response): Promise<Response> {
    try {
      const id = request.params.id;
      const product = await GetCustomerUsecase.findOne(id);
      return response.json(product).status(200);
    } catch (e) {
      return response.json(e).status(500);
    }
  }
}
