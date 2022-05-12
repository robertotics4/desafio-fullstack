import { ICreateSeatDTO } from '@modules/seats/dtos/ICreateSeatDTO';
import { IFindExistentSeat } from '@modules/seats/dtos/IFindExistentSeat';
import { IListSeatsDTO } from '@modules/seats/dtos/IListSeatsDTO';
import { ISeatsRepository } from '@modules/seats/repositories/ISeatsRepository';
import { getRepository, Repository } from 'typeorm';
import { Seat } from '../entities/Seat';

class SeatsRepository implements ISeatsRepository {
  private repository: Repository<Seat>;

  constructor() {
    this.repository = getRepository(Seat);
  }

  async create({ row, num }: ICreateSeatDTO): Promise<Seat> {
    const seat = this.repository.create({
      row: row.toUpperCase(),
      num,
    });

    await this.repository.save(seat);

    return seat;
  }

  async findByRow(row: string): Promise<Seat[]> {
    const seats = await this.repository.find({ row: row.toUpperCase() });

    return seats;
  }

  async findExistentSeat({ row, num }: IFindExistentSeat): Promise<Seat> {
    const seat = await this.repository.find({ row: row.toUpperCase(), num });

    return seat[0];
  }

  async list({ row }: IListSeatsDTO): Promise<Seat[]> {
    const seats = await this.repository.find(row ? { row } : {});

    return seats;
  }
}

export { SeatsRepository };
