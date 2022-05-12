import { ICreateSeatDTO } from '../dtos/ICreateSeatDTO';
import { IFindExistentSeat } from '../dtos/IFindExistentSeat';
import { IListSeatsDTO } from '../dtos/IListSeatsDTO';
import { Seat } from '../infra/typeorm/entities/Seat';

interface ISeatsRepository {
  create(data: ICreateSeatDTO): Promise<Seat>;
  findByRow(row: string): Promise<Seat[]>;
  findExistentSeat(data: IFindExistentSeat): Promise<Seat>;
  list({ row }: IListSeatsDTO): Promise<Seat[]>;
}

export { ISeatsRepository };
