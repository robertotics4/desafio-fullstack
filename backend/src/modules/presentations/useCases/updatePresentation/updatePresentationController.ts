import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdatePresentationUseCase } from './UpdatePresentationUseCase';

class UpdatePresentationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description, date, id } = request.body;

    const updatePresentationUseCase = container.resolve(
      UpdatePresentationUseCase,
    );

    const presentation = await updatePresentationUseCase.execute({
      id,
      name,
      description,
      date,
    });

    return response.status(200).json(presentation);
  }
}

export { UpdatePresentationController };
