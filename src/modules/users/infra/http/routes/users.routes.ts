import { Router } from 'express';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import ensureAuthenticated from '../middleware/ensureAuthenticated';

import UsersController from '../controllers/UsersController';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.get('/:id', ensureAuthenticated, async (req, res) => {
  const { id } = req.params;

  const usersRepository = new UsersRepository();
  const user = await usersRepository.findById(id);

  delete user?.password_hash;

  return res.json(user);
});

usersRouter.post('/new', usersController.create);

export default usersRouter;
