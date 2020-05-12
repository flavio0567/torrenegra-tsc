import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import AppError from '../errors/AppError';

import User from '../entity/User';

interface Request {
  first_name: string;
  last_name: string;
  position: string;
  hourly_cost: number;
  email: string;
  password: string;
  is_admin: number;
  is_active: number;
}

class CreateUserService {
  public async execute({
    first_name,
    last_name,
    position,
    hourly_cost,
    email,
    password,
    is_admin,
    is_active,
  }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const checkUserExists = await usersRepository.findOne({
      where: { email },
    });

    if (checkUserExists) {
      throw new AppError('E-mail address already used.', 401);
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      first_name,
      last_name,
      position,
      hourly_cost,
      email,
      password_hash: hashedPassword,
      is_admin,
      is_active,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
