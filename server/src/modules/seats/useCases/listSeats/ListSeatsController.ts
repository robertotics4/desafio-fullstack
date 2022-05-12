import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListSeatsUseCase } from './ListSeatsUseCase';

class ListSeatsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { row } = request.query;

    const listSeatsUseCase = container.resolve(ListSeatsUseCase);

    const seats = await listSeatsUseCase.execute({ row: row as string });

    return response.status(200).json(seats);
  }
}

export { ListSeatsController };
