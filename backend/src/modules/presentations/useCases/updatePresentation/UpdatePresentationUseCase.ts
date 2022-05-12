import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';
import { IPresentationsRepository } from '@modules/presentations/repositories/IPresentationsRepository';
import { Presentation } from '@modules/presentations/infra/typeorm/entities/Presentation';
import { isBefore } from 'date-fns';

interface IRequest {
  id: string;
  name: string;
  description: string;
  date: Date;
  imageUrl?: string;
}

@injectable()
class UpdatePresentationUseCase {
  constructor(
    @inject('PresentationsRepository')
    private presentationsRepository: IPresentationsRepository,
  ) {}

  async execute({
    id,
    name,
    description,
    date,
    imageUrl,
  }: IRequest): Promise<Presentation> {
    const presentationExists = await this.presentationsRepository.findById(id);

    if (!presentationExists) {
      throw new AppError('Presentation does not exists');
    }

    if (presentationExists.date) {
      const existsSameDate = await this.presentationsRepository.findByDate(
        date,
      );

      if (existsSameDate.length && existsSameDate[0].id !== id) {
        throw new AppError('There is another presentation on the same date');
      }

      if (isBefore(date, Date.now())) {
        throw new AppError('Invalid date');
      }
    }

    const updateResult = this.presentationsRepository.updatePresentation({
      id,
      name,
      description,
      date,
      imageUrl,
    });

    return updateResult;
  }
}

export { UpdatePresentationUseCase };
