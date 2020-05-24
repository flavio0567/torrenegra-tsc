import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ShowProfileService from '@modules/users/services/ShowProfileService';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';

export default class ProfileController {
  public async show(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;

    const showProfile = container.resolve(ShowProfileService);

    const user = await showProfile.execute({ user_id });

    return res.json(user);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;

    const {
      first_name,
      last_name,
      position,
      hourly_cost,
      email,
      old_password,
      password,
      is_admin,
      is_active,
    } = req.body;

    const updateProfile = container.resolve(UpdateProfileService);

    const user = await updateProfile.execute({
      user_id,
      first_name,
      last_name,
      position,
      hourly_cost,
      email,
      old_password,
      password,
      is_admin,
      is_active,
    });

    return res.json(user);
  }
}
