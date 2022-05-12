import { inject, injectable } from 'tsyringe';
import { isBefore } from 'date-fns';

import { AppError } from '@shared/errors/AppError';
import { IPresentationsRepository } from '@modules/presentations/repositories/IPresentationsRepository';
import { Presentation } from '@modules/presentations/infra/typeorm/entities/Presentation';
import { ISeatsRepository } from '@modules/seats/repositories/ISeatsRepository';
import { IPresentationSeatsRepository } from '@modules/presentations/repositories/IPresentationSeatsRepository';

interface IRequest {
  id?: string;
  name: string;
  description: string;
  date: Date;
  imageUrl?: string;
}

@injectable()
class CreatePresentationUseCase {
  constructor(
    @inject('PresentationsRepository')
    private presentationsRepository: IPresentationsRepository,

    @inject('SeatsRepository')
    private seatsRepository: ISeatsRepository,

    @inject('PresentationSeatsRepository')
    private presentationSeatsRepository: IPresentationSeatsRepository,
  ) {}

  async execute({
    id,
    name,
    description,
    date,
    imageUrl,
  }: IRequest): Promise<Presentation> {
    const existentPresentation = await this.presentationsRepository.findByDate(
      date,
    );

    if (existentPresentation.length) {
      throw new AppError('There is another presentation on the same date');
    }

    if (isBefore(date, Date.now())) {
      throw new AppError('Invalid date');
    }

    const presentation = await this.presentationsRepository.create({
      id,
      name,
      description,
      date,
      imageUrl,
    });

    const seats = await this.seatsRepository.list({});

    seats.forEach(async seat => {
      await this.presentationSeatsRepository.create({
        presentationId: presentation.id,
        seatId: seat.id,
        available: true,
        price: 27.99,
      });
    });

    return presentation;
  }
}

export { CreatePresentationUseCase };
