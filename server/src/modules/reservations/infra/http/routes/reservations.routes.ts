import { CancelReservationController } from '@modules/reservations/useCases/cancelReservation/CancelReservationController';
import { CreateReservationController } from '@modules/reservations/useCases/createReservation/CreateReservationController';
import { ListReservationsController } from '@modules/reservations/useCases/listReservations/ListReservationsController';
import { ensureAuthenticated } from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

const reservationsRoutes = Router();

const createReservationController = new CreateReservationController();
const cancelReservationController = new CancelReservationController();
const listReservationsController = new ListReservationsController();

reservationsRoutes.post(
  '/',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      presentationId: Joi.string().required(),
      presentationSeatId: Joi.string().required(),
    },
  }),
  createReservationController.handle,
);

reservationsRoutes.delete(
  '/:reservation_id',
  ensureAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      reservation_id: Joi.string().required(),
    },
  }),
  cancelReservationController.handle,
);

reservationsRoutes.get(
  '/',
  ensureAuthenticated,
  celebrate({
    [Segments.QUERY]: {
      presentationId: Joi.string(),
    },
  }),
  listReservationsController.handle,
);

export { reservationsRoutes };
