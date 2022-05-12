import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import { ensureAuthenticated } from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { ensureAdmin } from '@modules/users/infra/http/middlewares/ensureAdmin';
import { ListPresentationsController } from '@modules/presentations/useCases/listPresentations/ListPresentationsController';
import { CreatePresentationController } from '@modules/presentations/useCases/createPresentation/CreatePresentationController';
import { UpdatePresentationController } from '@modules/presentations/useCases/updatePresentation/updatePresentationController';
import { ListAvailableSeatsByPresentationController } from '@modules/presentations/useCases/listAvailableSeatsByPresentation/ListAvailableSeatsByPresentationController';
import { ShowFinanceController } from '@modules/presentations/useCases/showFinance/ShowFinanceController';
import { RemovePresentationController } from '@modules/presentations/useCases/removePresentation/RemovePresentationController';

const presentationsRoutes = Router();

const createPresentationController = new CreatePresentationController();
const listPresentationsController = new ListPresentationsController();
const updatePresentationController = new UpdatePresentationController();
const listAvailableSeatsByPresentationController =
  new ListAvailableSeatsByPresentationController();
const showFinanceController = new ShowFinanceController();
const removePresentationController = new RemovePresentationController();

presentationsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string().required(),
      date: Joi.date().required(),
      imageUrl: Joi.string(),
    },
  }),
  createPresentationController.handle,
);

presentationsRoutes.put(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().required(),
      name: Joi.string().required(),
      description: Joi.string().required(),
      date: Joi.date().required(),
      imageUrl: Joi.string(),
    },
  }),
  updatePresentationController.handle,
);

presentationsRoutes.delete(
  '/:presentation_id',
  ensureAuthenticated,
  ensureAdmin,
  celebrate({
    [Segments.PARAMS]: {
      presentation_id: Joi.string().required(),
    },
  }),
  removePresentationController.handle,
);

presentationsRoutes.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      name: Joi.string(),
      date: Joi.date(),
    },
  }),
  listPresentationsController.handle,
);

presentationsRoutes.get(
  '/availability',
  celebrate({
    [Segments.QUERY]: {
      presentationId: Joi.string().required(),
      availability: Joi.boolean().required(),
    },
  }),
  listAvailableSeatsByPresentationController.handle,
);

presentationsRoutes.get(
  '/finances/:presentation_id',
  ensureAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      presentation_id: Joi.string().required(),
    },
  }),

  showFinanceController.handle,
);

export { presentationsRoutes };
