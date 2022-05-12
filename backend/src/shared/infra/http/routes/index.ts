import { Router } from 'express';

import { usersRoutes } from '@modules/users/infra/http/routes/users.routes';
import { authenticationRoutes } from '@modules/users/infra/http/routes/authentication.routes';
import { seatsRoutes } from '@modules/seats/infra/http/routes/seats.routes';
import { presentationsRoutes } from '@modules/presentations/infra/http/presentations.routes';
import { reservationsRoutes } from '@modules/reservations/infra/http/routes/reservations.routes';

const router = Router();

router.use('/users', usersRoutes);
router.use('/sessions', authenticationRoutes);
router.use('/seats', seatsRoutes);
router.use('/presentations', presentationsRoutes);
router.use('/reservations', reservationsRoutes);

export default router;
