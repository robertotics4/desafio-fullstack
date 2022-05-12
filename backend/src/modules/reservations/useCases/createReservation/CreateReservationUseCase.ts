import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { IPresentationsRepository } from '@modules/presentations/repositories/IPresentationsRepository';
import { IPresentationSeatsRepository } from '@modules/presentations/repositories/IPresentationSeatsRepository';
import { IReservationsRepository } from '@modules/reservations/repositories/IReservationsRepository';
import { Reservation } from '@modules/reservations/infra/typeorm/entities/Reservation';

interface IRequest {
  userId: string;
  presentationId: string;
  presentationSeatId: string;
}

@injectable()
class CreateReservationUseCase {
  constructor(
    @inject('ReservationsRepository')
    private reservationsRepository: IReservationsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('PresentationsRepository')
    private presentationsRepository: IPresentationsRepository,

    @inject('PresentationSeatsRepository')
    private presentationSeatsRepository: IPresentationSeatsRepository,
  ) {}

  async execute({
    userId,
    presentationId,
    presentationSeatId,
  }: IRequest): Promise<Reservation> {
    const userExists = await this.usersRepository.findById(userId);

    if (!userExists) {
      throw new AppError('User does not exists');
    }

    const presentationExists = await this.presentationsRepository.findById(
      presentationId,
    );

    if (!presentationExists) {
      throw new AppError('Presentation does not exists');
    }

    const presentationSeatExists =
      await this.presentationSeatsRepository.findById(presentationSeatId);

    if (!presentationSeatExists) {
      throw new AppError('Presentation seat does not exists');
    }

    if (!presentationSeatExists.available) {
      throw new AppError('The presentation seat is not available');
    }

    const reservation = await this.reservationsRepository.create({
      userId,
      presentationId,
      presentationSeatId,
    });

    await this.presentationSeatsRepository.setAvailability({
      id: presentationSeatId,
      value: false,
    });

    return reservation;
  }
}

export { CreateReservationUseCase };
