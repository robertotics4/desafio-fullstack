import { IPresentationSeatsRepository } from '@modules/presentations/repositories/IPresentationSeatsRepository';
import { ICreatePresentationSeatDTO } from '@modules/presentations/dtos/ICreatePresentationSeatDTO';
import { ISetAvailabilityDTO } from '@modules/presentations/dtos/ISetAvailabilityDTO';
import { IListAvailabilityByPresentationDTO } from '@modules/presentations/dtos/IListAvailabilityByPresentationDTO';
import { PresentationSeat } from '@modules/presentations/infra/typeorm/entities/PresentationSeat';

class PresentationSeatsRepositoryInMemory
  implements IPresentationSeatsRepository
{
  private presentationSeats: PresentationSeat[] = [];

  async setAvailability({
    id,
    value,
  }: ISetAvailabilityDTO): Promise<PresentationSeat> {
    const presentationSeat = this.presentationSeats.find(
      presentationSeat => presentationSeat.id === id,
    );

    const updated = {
      ...presentationSeat,
      available: value,
    };

    this.presentationSeats.forEach(presentationSeat => {
      if (presentationSeat.id === id) {
        Object.assign(presentationSeat, { ...updated });
      }
    });

    return updated;
  }

  async create({
    presentationId,
    seatId,
    available,
    price,
  }: ICreatePresentationSeatDTO): Promise<PresentationSeat> {
    const presentationSeat = new PresentationSeat();

    Object.assign(presentationSeat, {
      presentationId,
      seatId,
      available,
      price,
    });

    this.presentationSeats.push(presentationSeat);

    return presentationSeat;
  }

  async findById(id: string): Promise<PresentationSeat> {
    return this.presentationSeats.find(
      presentationSeat => presentationSeat.id === id,
    );
  }

  async listAvailabilityByPresentation({
    presentationId,
    availability,
  }: IListAvailabilityByPresentationDTO): Promise<PresentationSeat[]> {
    const availableSeats = this.presentationSeats.map(presentationSeat => {
      if (
        presentationSeat.presentationId === presentationId &&
        presentationSeat.available === availability
      ) {
        return presentationSeat;
      }

      return undefined;
    });

    return availableSeats;
  }
}

export { PresentationSeatsRepositoryInMemory };
