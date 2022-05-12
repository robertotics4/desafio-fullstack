import { inject, injectable } from 'tsyringe';

import { IPresentationsRepository } from '@modules/presentations/repositories/IPresentationsRepository';
import { Finance } from '@modules/presentations/infra/typeorm/entities/Finance';
import { AppError } from '@shared/errors/AppError';
import { IPresentationSeatsRepository } from '@modules/presentations/repositories/IPresentationSeatsRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

interface IRequest {
  userId: string;
  presentationId: string;
}

@injectable()
class ShowFinanceUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('PresentationsRepository')
    private presentationsRepository: IPresentationsRepository,

    @inject('PresentationSeatsRepository')
    private presentationSeatsRepository: IPresentationSeatsRepository,
  ) {}

  async execute({ userId, presentationId }: IRequest): Promise<Finance> {
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

    const finance = new Finance();

    const totalSeats = presentationExists.presentationSeats.length;

    const reservedSeats =
      await this.presentationSeatsRepository.listAvailabilityByPresentation({
        presentationId,
        availability: false,
      });

    const totalAmount = reservedSeats.length * 27.99;
    const individualTax = 27.99 * 0.1433;
    const totalTaxes = individualTax * reservedSeats.length;

    Object.assign(finance, {
      presentationId,
      totalSeats,
      totalReservedSeats: reservedSeats.length,
      totalAvailableSeats: totalSeats - reservedSeats.length,
      totalAmount,
      totalTaxes,
      totalAmountWithTaxes: totalAmount - totalTaxes,
    });

    return finance;
  }
}

export { ShowFinanceUseCase };
