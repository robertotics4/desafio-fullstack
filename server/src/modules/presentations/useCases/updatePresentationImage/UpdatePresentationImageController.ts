import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdatePresentationImageUseCase } from './UpdatePresentationImageUseCase';

class UpdatePresentationImageController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { presentation_id } = request.params;
    const image_file = request.file.filename;

    const updatePresentationImageUseCase = container.resolve(
      UpdatePresentationImageUseCase,
    );

    await updatePresentationImageUseCase.execute({
      presentation_id,
      image_file,
    });

    return response.status(204).send();
  }
}

export { UpdatePresentationImageController };
