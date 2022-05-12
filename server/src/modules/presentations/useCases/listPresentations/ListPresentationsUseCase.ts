import { inject, injectable } from 'tsyringe';

import { Presentation } from '@modules/presentations/infra/typeorm/entities/Presentation';
import { IPresentationsRepository } from '@modules/presentations/repositories/IPresentationsRepository';

interface IRequest {
  name?: string;
  date?: Date;
}

@injectable()
class ListPresentationsUseCase {
  constructor(
    @inject('PresentationsRepository')
    private presentationsRepository: IPresentationsRepository,
  ) {}

  async execute({ name, date }: IRequest): Promise<Presentation[]> {
    const presentations = await this.presentationsRepository.list({
      name,
      date,
    });

    return presentations;
  }
}

export { ListPresentationsUseCase };
