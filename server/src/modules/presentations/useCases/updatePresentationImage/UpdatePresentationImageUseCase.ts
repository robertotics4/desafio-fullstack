import { IPresentationsRepository } from '@modules/presentations/repositories/IPresentationsRepository';
import { AppError } from '@shared/errors/AppError';
import { deleteFile } from '@utils/file';
import { injectable, inject } from 'tsyringe';

interface IRequest {
  presentation_id: string;
  image_file: string;
}

@injectable()
class UpdatePresentationImageUseCase {
  constructor(
    @inject('PresentationsRepository')
    private presentationsRepository: IPresentationsRepository,
  ) {}
  async execute({ presentation_id, image_file }: IRequest): Promise<void> {
    const presentation = await this.presentationsRepository.findById(
      presentation_id,
    );

    if (!presentation) {
      throw new AppError('Presentation does not exists');
    }

    if (presentation.image) {
      await deleteFile(`./tmp/presentation_image/${presentation.image}`);
    }

    presentation.image = image_file;

    await this.presentationsRepository.create(presentation);
  }
}

export { UpdatePresentationImageUseCase };
