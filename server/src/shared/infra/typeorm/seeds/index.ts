import { createSeats } from '../../../../modules/seats/infra/typeorm/seeds/seat';
import { createTest } from '../../../../modules/users/infra/typeorm/seeds/test';
import { createAdmin } from '../../../../modules/users/infra/typeorm/seeds/admin';

export default async () => {
  await createAdmin();
  await createTest();
  await createSeats();
};
