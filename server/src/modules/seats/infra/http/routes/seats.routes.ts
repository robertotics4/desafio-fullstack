import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import { ensureAuthenticated } from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { ensureAdmin } from '@modules/users/infra/http/middlewares/ensureAdmin';
import { CreateSeatController } from '@modules/seats/useCases/createSeat/CreateSeatController';
import { ListSeatsController } from '@modules/seats/useCases/listSeats/ListSeatsController';

const seatsRoutes = Router();

const createSeatController = new CreateSeatController();
const listSeatsController = new ListSeatsController();

seatsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  celebrate({
    [Segments.BODY]: {
      row: Joi.string().length(1).required(),
      num: Joi.number().required(),
    },
  }),
  createSeatController.handle,
);

seatsRoutes.get(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  celebrate({
    [Segments.QUERY]: {
      row: Joi.string().length(1),
    },
  }),
  listSeatsController.handle,
);

export { seatsRoutes };
