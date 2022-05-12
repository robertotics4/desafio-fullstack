import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreatePresentationUseCase } from './CreatePresentationUseCase';

class CreatePresentationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description, date, imageUrl } = request.body;

    const createPresentationUseCase = container.resolve(
      CreatePresentationUseCase,
    );

    const presentation = await createPresentationUseCase.execute({
      name,
      description,
      date,
      imageUrl,
    });

    return response.status(201).json(presentation);
  }
}

export { CreatePresentationController };
