import { PresentationSeatsRepositoryInMemory } from '@modules/presentations/repositories/in-memory/PresentationSeatsRepositoryInMemory';
import { PresentationsRepositoryInMemory } from '@modules/presentations/repositories/in-memory/PresentationsRepositoryInMemory';
import { SeatsRepositoryInMemory } from '@modules/seats/repositories/in-memory/SeatsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';
import { CreatePresentationUseCase } from './CreatePresentationUseCase';

let presentationsRepositoryInMemory: PresentationsRepositoryInMemory;
let seatsRepositoryInMemory: SeatsRepositoryInMemory;
let presentationSeatsRepositoryInMemory: PresentationSeatsRepositoryInMemory;
let createPresentationUseCase: CreatePresentationUseCase;
let currentDate: Date;

describe('Create presentation', () => {
  beforeEach(() => {
    presentationsRepositoryInMemory = new PresentationsRepositoryInMemory();
    seatsRepositoryInMemory = new SeatsRepositoryInMemory();
    presentationSeatsRepositoryInMemory =
      new PresentationSeatsRepositoryInMemory();

    createPresentationUseCase = new CreatePresentationUseCase(
      presentationsRepositoryInMemory,
      seatsRepositoryInMemory,
      presentationSeatsRepositoryInMemory,
    );

    currentDate = new Date();
  });

  it('should be able to create a new presentation', async () => {
    const presentation = await createPresentationUseCase.execute({
      name: 'Test Presentation',
      description: 'This is a test presentation',
      date: new Date(currentDate.setDate(currentDate.getDate() + 1)),
    });

    expect(presentation).toHaveProperty('id');
    expect(presentation.name).toBe('Test Presentation');
  });

  it('should not be able to create a new presentation with same date from another', async () => {
    const date = new Date(currentDate.setDate(currentDate.getDate() + 2));

    await createPresentationUseCase.execute({
      name: 'New Presentation',
      description: 'This is a new presentation',
      date,
    });

    await expect(
      createPresentationUseCase.execute({
        name: 'New Presentation 2',
        description: 'This is a test presentation 2',
        date,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new presentation with the date before the current', async () => {
    currentDate = new Date();
    const yesterday = new Date(currentDate.setDate(currentDate.getDate() - 1));

    await expect(
      createPresentationUseCase.execute({
        name: 'New Presentation Test',
        description: 'This is a new presentation',
        date: yesterday,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
