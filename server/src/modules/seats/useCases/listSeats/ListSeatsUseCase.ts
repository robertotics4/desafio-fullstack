import { Seat } from '@modules/seats/infra/typeorm/entities/Seat';
import { inject, injectable } from 'tsyringe';

import { ISeatsRepository } from '@modules/seats/repositories/ISeatsRepository';

interface IRequest {
  row?: string;
}

@injectable()
class ListSeatsUseCase {
  constructor(
    @inject('SeatsRepository')
    private seatsRepository: ISeatsRepository,
  ) {}

  async execute({ row }: IRequest): Promise<Seat[]> {
    const seats = await this.seatsRepository.list({ row });

    return seats;
  }
}

export { ListSeatsUseCase };
