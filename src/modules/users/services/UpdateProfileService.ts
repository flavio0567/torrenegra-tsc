import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';

import User from '../infra/typeorm/entities/User';

interface IRequest {
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  old_password?: string;
  password?: string;
  position?: string;
  hourly_cost?: number;
  is_admin?: number;
  is_active?: number;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  public async execute({
    user_id,
    first_name,
    last_name,
    email,
    old_password,
    password,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.');
    }

    const findUserWithUpdatedEmail = await this.usersRepository.findByEmail(
      email
    );

    if (findUserWithUpdatedEmail && findUserWithUpdatedEmail.id !== user_id) {
      throw new AppError('E-mail already in use.');
    }

    user.first_name = first_name;
    user.last_name = last_name;
    user.email = email;

    if (password && !old_password) {
      throw new AppError('You must inform your old password to set a new one.');
    }

    if (password && old_password) {
      const checkOldPassword = await this.hashProvider.compareHash(
        old_password,
        user.password_hash
      );

      if (!checkOldPassword) {
        throw new AppError('Old password does not match.');
      }

      user.password_hash = await this.hashProvider.generateHash(password);
    }

    user.first_name = first_name;
    user.last_name = last_name;
    user.email = email;

    return this.usersRepository.save(user);
  }
}

export default UpdateProfileService;
