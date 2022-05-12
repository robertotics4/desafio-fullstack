import { container } from 'tsyringe';

import '@shared/container/providers';

import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { ISeatsRepository } from '@modules/seats/repositories/ISeatsRepository';
import { SeatsRepository } from '@modules/seats/infra/typeorm/repositories/SeatsRepository';
import { IPresentationsRepository } from '@modules/presentations/repositories/IPresentationsRepository';
import { PresentationsRepository } from '@modules/presentations/infra/typeorm/repositories/PresentationsRepository';
import { IPresentationSeatsRepository } from '@modules/presentations/repositories/IPresentationSeatsRepository';
import { PresentationSeatsRepository } from '@modules/presentations/infra/typeorm/repositories/PresentationSeatsRepository';
import { IReservationsRepository } from '@modules/reservations/repositories/IReservationsRepository';
import { ReservationsRepository } from '@modules/reservations/infra/typeorm/repositories/ReservationsRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<ISeatsRepository>(
  'SeatsRepository',
  SeatsRepository,
);

container.registerSingleton<IPresentationsRepository>(
  'PresentationsRepository',
  PresentationsRepository,
);

container.registerSingleton<IPresentationSeatsRepository>(
  'PresentationSeatsRepository',
  PresentationSeatsRepository,
);

container.registerSingleton<IReservationsRepository>(
  'ReservationsRepository',
  ReservationsRepository,
);
