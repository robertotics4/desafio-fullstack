import { Seat } from '@modules/seats/infra/typeorm/entities/Seat';
import { inject, injectable } from 'tsyringe';

import { ISeatsRepository } from '@modules/seats/repositories/ISeatsRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  row: string;
  num: number;
}

@injectable()
class CreateSeatUseCase {
  constructor(
    @inject('SeatsRepository')
    private seatsRepository: ISeatsRepository,
  ) {}

  async execute({ row, num }: IRequest): Promise<Seat> {
    const existentSeat = await this.seatsRepository.findExistentSeat({
      row,
      num,
    });

    if (row.length > 1) {
      throw new AppError('Invalid row seat (maxLenght = 1)!');
    }

    if (existentSeat) {
      throw new AppError('Seat already exists!');
    }

    const seat = await this.seatsRepository.create({ row, num });

    return seat;
  }
}

export { CreateSeatUseCase };
