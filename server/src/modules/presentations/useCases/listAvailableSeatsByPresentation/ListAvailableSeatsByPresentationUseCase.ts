import { inject, injectable } from 'tsyringe';

import { IPresentationsRepository } from '@modules/presentations/repositories/IPresentationsRepository';
import { AppError } from '@shared/errors/AppError';
import { IPresentationSeatsRepository } from '@modules/presentations/repositories/IPresentationSeatsRepository';
import { PresentationSeat } from '@modules/presentations/infra/typeorm/entities/PresentationSeat';

interface IRequest {
  presentationId: string;
  availability: boolean;
}

@injectable()
class ListAvailableSeatsByPresentationUseCase {
  constructor(
    @inject('PresentationsRepository')
    private presentationsRepository: IPresentationsRepository,

    @inject('PresentationSeatsRepository')
    private presentationSeatsRepository: IPresentationSeatsRepository,
  ) {}

  async execute({
    presentationId,
    availability,
  }: IRequest): Promise<PresentationSeat[]> {
    const presentationExists = await this.presentationsRepository.findById(
      presentationId,
    );

    if (!presentationExists) {
      throw new AppError('Presentation does not exists');
    }

    const availableSeats =
      await this.presentationSeatsRepository.listAvailabilityByPresentation({
        presentationId,
        availability,
      });

    return availableSeats;
  }
}

export { ListAvailableSeatsByPresentationUseCase };
