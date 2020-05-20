import 'reflect-metadata';
import AppError from '@shared/errors/AppError';

import AuthenticateUserService from './AuthenticateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/FakeUsersRepository';
import CreateUserService from './CreateUserService';

describe('AuthenticateUser', () => {
  it('should be able to Authenticate a user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );
    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider
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

    const response = await authenticateUser.execute({
      email: 'fmrocha@gmail.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to Authenticate non-user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    await authenticateUser.execute({
      email: 'fmrocha@gmail.com',
      password: '123456',
    });

    expect(
      authenticateUser.execute({
        email: 'fmrocha@gmail.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to Authenticate with incorrect password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );
    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider
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
      authenticateUser.execute({
        email: 'fmrocha@gmail.com',
        password: '654321',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
