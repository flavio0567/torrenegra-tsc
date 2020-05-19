import { hash } from 'bcryptjs';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

import User from '../infra/typeorm/entities/User';

interface IRequest {
  first_name: string;
  last_name: string;
  position: string;
  hourly_cost: number;
  email: string;
  password: string;
  is_admin: number;
  is_active: number;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute({
    first_name,
    last_name,
    position,
    hourly_cost,
    email,
    password,
    is_admin,
    is_active,
  }: IRequest): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('E-mail address already used.', 401);
    }

    const hashedPassword = await hash(password, 10);

    const user = await this.usersRepository.create({
      first_name,
      last_name,
      position,
      hourly_cost,
      email,
      password_hash: hashedPassword,
      is_admin,
      is_active,
    });

    return user;
  }
}

export default CreateUserService;
