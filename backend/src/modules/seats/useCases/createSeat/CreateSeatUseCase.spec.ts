import { SeatsRepositoryInMemory } from '@modules/seats/repositories/in-memory/SeatsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';
import { CreateSeatUseCase } from './CreateSeatUseCase';

let createSeatUseCase: CreateSeatUseCase;
let seatsRepositoryInMemory: SeatsRepositoryInMemory;

describe('Create seat', () => {
  beforeEach(() => {
    seatsRepositoryInMemory = new SeatsRepositoryInMemory();
    createSeatUseCase = new CreateSeatUseCase(seatsRepositoryInMemory);
  });

  it('should be able to create a new seat', async () => {
    const seat = await createSeatUseCase.execute({
      row: 'A',
      num: 1,
    });

    expect(seat).toHaveProperty('id');
  });

  it('should not be able to create a new seat with the row length bigger than 1', async () => {
    await expect(
      createSeatUseCase.execute({
        row: 'AB',
        num: 1,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
