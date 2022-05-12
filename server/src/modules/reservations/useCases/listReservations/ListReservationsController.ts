import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListReservationsUseCase } from './ListReservationsUseCase';

class ListReservationsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { presentationId } = request.query;
    const { id } = request.user;

    const listReservationsUseCase = container.resolve(ListReservationsUseCase);

    const reservations = await listReservationsUseCase.execute({
      userId: id,
      presentationId: presentationId as string,
    });

    return response.status(200).json(reservations);
  }
}

export { ListReservationsController };
