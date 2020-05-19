import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';

export default class UsersController {
  public async create(req: Request, res: Response): Promise<Response> {
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

    const createUser = container.resolve(CreateUserService);

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
  }
}
