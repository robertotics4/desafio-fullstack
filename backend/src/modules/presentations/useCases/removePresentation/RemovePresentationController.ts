import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { RemovePresentationUseCase } from './RemovePresentationUseCase';

class RemovePresentationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { presentation_id } = request.params;

    const removePresentationUseCase = container.resolve(
      RemovePresentationUseCase,
    );

    await removePresentationUseCase.execute(presentation_id);

    return response.status(204).send();
  }
}

export { RemovePresentationController };
