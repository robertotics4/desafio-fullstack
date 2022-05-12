import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateReservationUseCase } from './CreateReservationUseCase';

class CreateReservationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { presentationId, presentationSeatId } = request.body;
    const { id } = request.user;

    const createReservationUseCase = container.resolve(
      CreateReservationUseCase,
    );

    const reservation = await createReservationUseCase.execute({
      userId: id,
      presentationId,
      presentationSeatId,
    });

    return response.status(201).json(reservation);
  }
}

export { CreateReservationController };
