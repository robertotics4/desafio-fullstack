import { PresentationSeatsRepositoryInMemory } from '@modules/presentations/repositories/in-memory/PresentationSeatsRepositoryInMemory';
import { PresentationsRepositoryInMemory } from '@modules/presentations/repositories/in-memory/PresentationsRepositoryInMemory';
import { SeatsRepositoryInMemory } from '@modules/seats/repositories/in-memory/SeatsRepositoryInMemory';
import { CreatePresentationUseCase } from '../createPresentation/CreatePresentationUseCase';
import { ListPresentationsUseCase } from './ListPresentationsUseCase';

let createPresentationUseCase: CreatePresentationUseCase;
let seatsRepositoryInMemory: SeatsRepositoryInMemory;
let listPresentationsUseCase: ListPresentationsUseCase;
let presentationsRepositoryInMemory: PresentationsRepositoryInMemory;
let presentationSeatsRepositoryInMemory: PresentationSeatsRepositoryInMemory;
let currentDate: Date;

describe('List presentations', () => {
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
    listPresentationsUseCase = new ListPresentationsUseCase(
      presentationsRepositoryInMemory,
    );

    currentDate = new Date();
  });

  it('should be able to list all presentations', async () => {
    await createPresentationUseCase.execute({
      name: 'Test Presentation',
      description: 'This is a test presentation',
      date: new Date(currentDate.setDate(currentDate.getDate() + 1)),
    });

    await createPresentationUseCase.execute({
      name: 'Test Presentation 2',
      description: 'This is a test presentation',
      date: new Date(currentDate.setDate(currentDate.getDate() + 2)),
    });

    const presentations = await listPresentationsUseCase.execute({});

    expect(presentations.length).toBe(2);
  });

  it('should be able to list presentations by name', async () => {
    await createPresentationUseCase.execute({
      name: 'Test Presentation 3',
      description: 'This is a test presentation',
      date: new Date(currentDate.setDate(currentDate.getDate() + 3)),
    });

    await createPresentationUseCase.execute({
      name: 'Test Presentation 4',
      description: 'This is a test presentation',
      date: new Date(currentDate.setDate(currentDate.getDate() + 4)),
    });

    const presentations = await listPresentationsUseCase.execute({
      name: 'Test Presentation 3',
    });

    expect(presentations.length).toBe(1);
  });

  it('should be able to find presentations by date', async () => {
    currentDate = new Date();

    const tenDaysLater = new Date(
      currentDate.setDate(currentDate.getDate() + 10),
    );

    await createPresentationUseCase.execute({
      name: 'Test Presentation 5',
      description: 'This is a test presentation',
      date: tenDaysLater,
    });

    await createPresentationUseCase.execute({
      name: 'Test Presentation 7',
      description: 'This is a test presentation',
      date: new Date(currentDate.setDate(currentDate.getDate() + 6)),
    });

    const presentations = await listPresentationsUseCase.execute({
      date: tenDaysLater,
    });

    expect(presentations.length).toBe(1);
  });
});
