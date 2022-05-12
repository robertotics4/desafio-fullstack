import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateSeatUseCase } from './CreateSeatUseCase';

class CreateSeatController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { row, num } = request.body;

    const createSeatUseCase = container.resolve(CreateSeatUseCase);

    const seat = await createSeatUseCase.execute({ row, num });

    return response.status(201).json(seat);
  }
}

export { CreateSeatController };
