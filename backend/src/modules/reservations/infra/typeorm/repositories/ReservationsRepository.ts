import { getRepository, Repository } from 'typeorm';

import { IReservationsRepository } from '@modules/reservations/repositories/IReservationsRepository';
import { ICreateReservationDTO } from '@modules/reservations/dtos/ICreateReservationDTO';
import { IListReservationsDTO } from '@modules/reservations/dtos/IListReservationsDTO';
import { Reservation } from '../entities/Reservation';

class ReservationsRepository implements IReservationsRepository {
  private repository: Repository<Reservation>;

  constructor() {
    this.repository = getRepository(Reservation);
  }

  async create({
    userId,
    presentationId,
    presentationSeatId,
  }: ICreateReservationDTO): Promise<Reservation> {
    const reservation = this.repository.create({
      userId,
      presentationId,
      presentationSeatId,
    });

    await this.repository.save(reservation);

    return reservation;
  }

  async findById(id: string): Promise<Reservation> {
    const reservation = await this.repository.findOne(id);

    return reservation;
  }

  async remove(id: string): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .delete()
      .from(Reservation)
      .where('id = :id', { id })
      .execute();
  }

  async list({ presentationId }: IListReservationsDTO): Promise<Reservation[]> {
    const reservations = await this.repository.find({
      where: presentationId ? { presentationId } : {},
      relations: ['presentation'],
      order: {
        created_at: 'DESC',
      },
    });

    return reservations;
  }
}

export { ReservationsRepository };
