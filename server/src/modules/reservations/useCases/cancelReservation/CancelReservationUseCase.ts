import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { IPresentationSeatsRepository } from '@modules/presentations/repositories/IPresentationSeatsRepository';
import { IReservationsRepository } from '@modules/reservations/repositories/IReservationsRepository';

interface IRequest {
  userId: string;
  reservationId: string;
}

@injectable()
class CancelReservationUseCase {
  constructor(
    @inject('ReservationsRepository')
    private reservationsRepository: IReservationsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('PresentationSeatsRepository')
    private presentationSeatsRepository: IPresentationSeatsRepository,
  ) {}

  async execute({ userId, reservationId }: IRequest): Promise<void> {
    const userExists = await this.usersRepository.findById(userId);

    if (!userExists) {
      throw new AppError('User does not exists');
    }

    const reservationExists = await this.reservationsRepository.findById(
      reservationId,
    );

    if (!reservationExists) {
      throw new AppError('Reservation does not exists');
    }

    await this.presentationSeatsRepository.setAvailability({
      id: reservationExists.presentationSeatId,
      value: true,
    });

    await this.reservationsRepository.remove(reservationId);
  }
}

export { CancelReservationUseCase };
