import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import UsersController from '../controllers/UsersController';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.use(ensureAuthenticated);

usersRouter.get(
  '/:id',
  celebrate({ [Segments.PARAMS]: { id: Joi.string().required() } }),
  async (req, res) => {
    const { id } = req.params;

    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(id);

    delete user?.password_hash;

    return res.json(user);
  }
);

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
      position: Joi.string().required(),
      hourly_cost: Joi.number().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      password_confirmation: Joi.string().required().valid(Joi.ref('password')),
      is_admin: Joi.number().default(0),
      is_active: Joi.number().default(0),
    },
  }),
  usersController.create
);

export default usersRouter;
