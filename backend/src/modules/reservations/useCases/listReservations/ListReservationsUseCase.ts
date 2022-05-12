import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { IPresentationsRepository } from '@modules/presentations/repositories/IPresentationsRepository';
import { IReservationsRepository } from '@modules/reservations/repositories/IReservationsRepository';
import { Reservation } from '@modules/reservations/infra/typeorm/entities/Reservation';

interface IRequest {
  userId: string;
  presentationId: string;
}

@injectable()
class ListReservationsUseCase {
  constructor(
    @inject('ReservationsRepository')
    private reservationsRepository: IReservationsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('PresentationsRepository')
    private presentationsRepository: IPresentationsRepository,
  ) {}

  async execute({ userId, presentationId }: IRequest): Promise<Reservation[]> {
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

    const reservations = await this.reservationsRepository.list({
      presentationId,
    });

    return reservations;
  }
}

export { ListReservationsUseCase };
