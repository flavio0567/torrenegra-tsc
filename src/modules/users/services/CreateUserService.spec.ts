import 'reflect-metadata';
import AppError from '@shared/errors/AppError';

import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/FakeUsersRepository';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const faseHashProvider = new FakeHashProvider();
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(
      fakeUsersRepository,
      faseHashProvider
    );

    const user = await createUser.execute({
      first_name: 'Flavio ',
      last_name: 'Rocha',
      position: 'Project Manager',
      hourly_cost: 145.0,
      email: 'fmrocha@gmail.com',
      password: '123456',
      is_admin: 0,
      is_active: 0,
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a duplicated email address', async () => {
    const faseHashProvider = new FakeHashProvider();
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(
      fakeUsersRepository,
      faseHashProvider
    );

    await createUser.execute({
      first_name: 'Flavio ',
      last_name: 'Rocha',
      position: 'Project Manager',
      hourly_cost: 145.0,
      email: 'fmrocha@gmail.com',
      password: '123456',
      is_admin: 0,
      is_active: 0,
    });

    expect(
      createUser.execute({
        first_name: 'Flavio ',
        last_name: 'Rocha',
        position: 'Project Manager',
        hourly_cost: 145.0,
        email: 'fmrocha@gmail.com',
        password: '123456',
        is_admin: 0,
        is_active: 0,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
