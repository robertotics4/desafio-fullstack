import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListAvailableSeatsByPresentationUseCase } from './ListAvailableSeatsByPresentationUseCase';

class ListAvailableSeatsByPresentationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { presentationId, availability } = request.query;

    const listAvailableSeatsByPresentationController = container.resolve(
      ListAvailableSeatsByPresentationUseCase,
    );

    const availableSeats =
      await listAvailableSeatsByPresentationController.execute({
        presentationId: presentationId as string,
        availability: Boolean(availability),
      });

    return response.status(200).json(availableSeats);
  }
}

export { ListAvailableSeatsByPresentationController };
