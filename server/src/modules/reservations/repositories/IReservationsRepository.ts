import { ICreateReservationDTO } from '../dtos/ICreateReservationDTO';
import { IListReservationsDTO } from '../dtos/IListReservationsDTO';
import { Reservation } from '../infra/typeorm/entities/Reservation';

interface IReservationsRepository {
  create(data: ICreateReservationDTO): Promise<Reservation>;
  remove(id: string): Promise<void>;
  findById(id: string): Promise<Reservation>;
  list({ presentationId }: IListReservationsDTO): Promise<Reservation[]>;
}

export { IReservationsRepository };
