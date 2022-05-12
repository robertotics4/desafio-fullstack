import { isSameDay } from 'date-fns';

import { ICreatePresentationDTO } from '@modules/presentations/dtos/ICreatePresentationDTO';
import { IUpdatePresentationDTO } from '@modules/presentations/dtos/IUpdatePresentationDTO';
import { Presentation } from '@modules/presentations/infra/typeorm/entities/Presentation';
import { IListPresentationsDTO } from '@modules/presentations/dtos/IListPresentationsDTO';
import { IPresentationsRepository } from '../IPresentationsRepository';

class PresentationsRepositoryInMemory implements IPresentationsRepository {
  private presentations: Presentation[] = [];

  async create({
    name,
    description,
    date,
    imageUrl,
  }: ICreatePresentationDTO): Promise<Presentation> {
    const presentation = new Presentation();

    Object.assign(presentation, {
      name,
      description,
      date,
      imageUrl,
    });

    this.presentations.push(presentation);

    return presentation;
  }

  async findById(id: string): Promise<Presentation> {
    return this.presentations.find(presentation => presentation.id === id);
  }

  async updatePresentation({
    id,
    name,
    description,
    date,
    imageUrl,
  }: IUpdatePresentationDTO): Promise<Presentation> {
    const presentationIndex = this.presentations.findIndex(
      presentation => presentation.id === id,
    );

    if (presentationIndex < 0) {
      return undefined;
    }

    const presentation = this.presentations[presentationIndex];

    Object.assign(presentation, { name, description, date, imageUrl });

    return presentation;
  }

  async findByName(name: string): Promise<Presentation> {
    return this.presentations.find(presentation => presentation.name === name);
  }

  async findByDate(date: Date): Promise<Presentation[]> {
    const presentations = this.presentations.filter(presentation =>
      isSameDay(date, presentation.date),
    );

    return presentations;
  }

  async list({ name, date }: IListPresentationsDTO): Promise<Presentation[]> {
    let presentations = [...this.presentations];

    if (name) {
      presentations = presentations.filter(
        presentation => presentation.name === name,
      );
    }

    if (date) {
      presentations = presentations.filter(presentation =>
        isSameDay(date, presentation.date),
      );
    }

    return presentations;
  }

  async remove(id: string): Promise<void> {
    this.presentations = this.presentations.filter(
      presentation => presentation.id !== id,
    );
  }
}

export { PresentationsRepositoryInMemory };
