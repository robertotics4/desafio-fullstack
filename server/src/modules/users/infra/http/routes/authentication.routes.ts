import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import { AuthenticateUserController } from '@modules/users/useCases/authenticateUser/AuthenticateUserControler';

const authenticationRoutes = Router();

const authenticateUserController = new AuthenticateUserController();

authenticationRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string()
        .required()
        .pattern(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        )
        .message('E-mail inválido'),
      password: Joi.string().required(),
    },
  }),
  authenticateUserController.handle,
);

export { authenticationRoutes };
