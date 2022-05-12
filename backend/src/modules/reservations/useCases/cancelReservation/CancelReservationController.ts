import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CancelReservationUseCase } from './CancelReservationUseCase';

class CancelReservationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { reservation_id } = request.params;
    const { id } = request.user;

    const cancelReservationUseCase = container.resolve(
      CancelReservationUseCase,
    );

    await cancelReservationUseCase.execute({
      userId: id,
      reservationId: reservation_id,
    });

    return response.status(204).send();
  }
}

export { CancelReservationController };
