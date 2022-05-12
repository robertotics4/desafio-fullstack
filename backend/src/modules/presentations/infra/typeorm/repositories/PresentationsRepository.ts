import { getRepository, Repository, ILike } from 'typeorm';
import { isSameDay } from 'date-fns';

import { ICreatePresentationDTO } from '@modules/presentations/dtos/ICreatePresentationDTO';
import { IUpdatePresentationDTO } from '@modules/presentations/dtos/IUpdatePresentationDTO';
import { IPresentationsRepository } from '@modules/presentations/repositories/IPresentationsRepository';
import { IListPresentationsDTO } from '@modules/presentations/dtos/IListPresentationsDTO';
import { Presentation } from '../entities/Presentation';

interface IFilters {
  name?: string;
  date?: Date;
}

class PresentationsRepository implements IPresentationsRepository {
  private repository: Repository<Presentation>;

  constructor() {
    this.repository = getRepository(Presentation);
  }

  async create({
    id,
    name,
    description,
    date,
    imageUrl,
  }: ICreatePresentationDTO): Promise<Presentation> {
    const presentation = this.repository.create({
      id,
      name,
      description,
      date,
      imageUrl,
    });

    await this.repository.save(presentation);

    return presentation;
  }

  async findById(id: string): Promise<Presentation> {
    const presentation = await this.repository.findOne(id);

    return presentation;
  }

  async updatePresentation({
    id,
    name,
    description,
    date,
    imageUrl,
  }: IUpdatePresentationDTO): Promise<Presentation> {
    await this.repository.update(
      { id },
      {
        name,
        description,
        date,
        imageUrl,
      },
    );

    return {
      id,
      name,
      description,
      date,
      imageUrl,
    } as Presentation;
  }

  async findByName(name: string): Promise<Presentation> {
    const presentation = await this.repository.findOne({ name });

    return presentation;
  }

  async findByDate(date: Date): Promise<Presentation[]> {
    const presentations = await this.repository.find();

    const filtered = presentations.filter(presentation =>
      isSameDay(date, presentation.date),
    );

    return filtered;
  }

  async list({ name, date }: IListPresentationsDTO): Promise<Presentation[]> {
    const filters: IFilters = {};
    let presentations: Presentation[];

    if (name) {
      Object.assign(filters, { name: ILike(`%${name}`) });
    }

    presentations = await this.repository.find({
      where: filters,
      order: {
        date: 'DESC',
      },
    });

    if (date) {
      presentations = presentations.filter(presentation =>
        isSameDay(date, presentation.date),
      );
    }

    return presentations;
  }

  async remove(id: string): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .delete()
      .from(Presentation)
      .where('id = :id', { id })
      .execute();
  }
}

export { PresentationsRepository };
