import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListPresentationsUseCase } from './ListPresentationsUseCase';

class ListPresentationsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, date } = request.query;

    const listPresenationsUseCase = container.resolve(ListPresentationsUseCase);

    const presentations = await listPresenationsUseCase.execute({
      name: name as string,
      date: date ? new Date(date as string) : undefined,
    });

    return response.status(200).json(presentations);
  }
}

export { ListPresentationsController };
