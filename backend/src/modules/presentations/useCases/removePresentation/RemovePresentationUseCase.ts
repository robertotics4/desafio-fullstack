import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';
import { IPresentationsRepository } from '@modules/presentations/repositories/IPresentationsRepository';

@injectable()
class RemovePresentationUseCase {
  constructor(
    @inject('PresentationsRepository')
    private presentationsRepository: IPresentationsRepository,
  ) {}

  async execute(presentationId: string): Promise<void> {
    const presentationExists = await this.presentationsRepository.findById(
      presentationId,
    );

    if (!presentationExists) {
      throw new AppError('Presentation does not exists');
    }

    await this.presentationsRepository.remove(presentationId);
  }
}

export { RemovePresentationUseCase };
