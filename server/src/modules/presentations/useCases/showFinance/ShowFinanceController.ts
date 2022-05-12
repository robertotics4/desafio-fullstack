import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ShowFinanceUseCase } from './ShowFinanceUseCase';

class ShowFinanceController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { presentation_id } = request.params;
    const { id } = request.user;

    const showFinanceUseCase = container.resolve(ShowFinanceUseCase);

    const finance = await showFinanceUseCase.execute({
      userId: id,
      presentationId: presentation_id,
    });

    return response.status(200).json(finance);
  }
}

export { ShowFinanceController };
