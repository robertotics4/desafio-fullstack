import { getRepository, Repository } from 'typeorm';
import { orderBy } from 'lodash';

import { IPresentationSeatsRepository } from '@modules/presentations/repositories/IPresentationSeatsRepository';
import { ICreatePresentationSeatDTO } from '@modules/presentations/dtos/ICreatePresentationSeatDTO';
import { ISetAvailabilityDTO } from '@modules/presentations/dtos/ISetAvailabilityDTO';
import { IListAvailabilityByPresentationDTO } from '@modules/presentations/dtos/IListAvailabilityByPresentationDTO';
import { PresentationSeat } from '../entities/PresentationSeat';

class PresentationSeatsRepository implements IPresentationSeatsRepository {
  private repository: Repository<PresentationSeat>;

  constructor() {
    this.repository = getRepository(PresentationSeat);
  }

  async setAvailability({
    id,
    value,
  }: ISetAvailabilityDTO): Promise<PresentationSeat> {
    const presentationSeat = await this.repository.findOne(id);

    const updated = {
      ...presentationSeat,
      available: value,
    };

    await this.repository.update({ id }, updated);

    return updated;
  }

  async create({
    presentationId,
    seatId,
    available,
    price,
  }: ICreatePresentationSeatDTO): Promise<PresentationSeat> {
    const presentationSeat = this.repository.create({
      presentationId,
      seatId,
      available,
      price,
    });

    await this.repository.save(presentationSeat);

    return presentationSeat;
  }

  async findById(id: string): Promise<PresentationSeat> {
    const presentationSeat = await this.repository.findOne(id);

    return presentationSeat;
  }

  async listAvailabilityByPresentation({
    presentationId,
    availability,
  }: IListAvailabilityByPresentationDTO): Promise<PresentationSeat[]> {
    const availableSeats = await this.repository.find({
      where: [{ presentationId, available: availability }],
    });

    const sortedByRow = orderBy(
      availableSeats,
      presentationSeat => presentationSeat.seat.row,
    );

    const sortedByNum = orderBy(
      sortedByRow,
      presentationSeat => presentationSeat.seat.num,
    );

    return sortedByNum;
  }
}

export { PresentationSeatsRepository };
