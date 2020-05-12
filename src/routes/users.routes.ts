import { Router } from 'express';

import { getRepository } from 'typeorm';
import CreateUserService from '../services/CreateUserService';
import User from '../entity/User';

import ensureAuthenticated from '../middleware/ensureAuthenticated';

const usersRouter = Router();

usersRouter.get('/', ensureAuthenticated, async (req, res) => {
  const usersRepository = getRepository(User);
  const users = await usersRepository.find({});

  // delete users.password_hash;

  return res.json(users);
});

usersRouter.post('/new', async (req, res) => {
  const {
    first_name,
    last_name,
    position,
    hourly_cost,
    email,
    password,
    is_admin,
    is_active,
  } = req.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({
    first_name,
    last_name,
    position,
    hourly_cost,
    email,
    password,
    is_admin,
    is_active,
  });

  delete user.password_hash;

  return res.json(user);
});

export default usersRouter;
