import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import { CreateUserController } from '@modules/users/useCases/createUser/CreateUserController';
import { ShowProfileController } from '@modules/users/useCases/showProfile/ShowProfileController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const usersRoutes = Router();

const createUserController = new CreateUserController();
const showProfileController = new ShowProfileController();

usersRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string()
        .required()
        .pattern(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        )
        .message('E-mail inválido'),
      password: Joi.string().required(),
    },
  }),
  createUserController.handle,
);

usersRoutes.get('/profile', ensureAuthenticated, showProfileController.handle);

export { usersRoutes };
