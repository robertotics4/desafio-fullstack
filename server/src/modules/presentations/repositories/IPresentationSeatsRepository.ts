import { ICreatePresentationSeatDTO } from '../dtos/ICreatePresentationSeatDTO';
import { IListAvailabilityByPresentationDTO } from '../dtos/IListAvailabilityByPresentationDTO';
import { ISetAvailabilityDTO } from '../dtos/ISetAvailabilityDTO';
import { PresentationSeat } from '../infra/typeorm/entities/PresentationSeat';

interface IPresentationSeatsRepository {
  create(data: ICreatePresentationSeatDTO): Promise<PresentationSeat>;
  findById(id: string): Promise<PresentationSeat>;
  setAvailability({
    id,
    value,
  }: ISetAvailabilityDTO): Promise<PresentationSeat>;
  listAvailabilityByPresentation({
    presentationId: string,
    availability: boolean,
  }: IListAvailabilityByPresentationDTO): Promise<PresentationSeat[]>;
}

export { IPresentationSeatsRepository };
