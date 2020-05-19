import { Router } from 'express';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UserRepository';
import ensureAuthenticated from '../middleware/ensureAuthenticated';

import UsersController from '../controllers/UsersController';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.get('/', ensureAuthenticated, async (req, res) => {
  const { id } = req.params;

  const usersRepository = new UsersRepository();
  const users = await usersRepository.findById(id);

  // delete users.password_hash;

  return res.json(users);
});

usersRouter.post('/new', usersController.create);

export default usersRouter;
