import { ICreatePresentationDTO } from '../dtos/ICreatePresentationDTO';
import { IListPresentationsDTO } from '../dtos/IListPresentationsDTO';
import { IUpdatePresentationDTO } from '../dtos/IUpdatePresentationDTO';
import { Presentation } from '../infra/typeorm/entities/Presentation';

interface IPresentationsRepository {
  create(data: ICreatePresentationDTO): Promise<Presentation>;
  findById(id: string): Promise<Presentation>;
  findByName(name: string): Promise<Presentation>;
  findByDate(date: Date): Promise<Presentation[]>;
  list(data: IListPresentationsDTO): Promise<Presentation[]>;
  updatePresentation(data: IUpdatePresentationDTO): Promise<Presentation>;
  remove(id: string): Promise<void>;
}

export { IPresentationsRepository };
