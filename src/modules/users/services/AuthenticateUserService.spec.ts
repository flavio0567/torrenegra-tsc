import 'reflect-metadata';
import AppError from '@shared/errors/AppError';

import AuthenticateUserService from './AuthenticateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );
  });
  it('should be able to Authenticate a user', async () => {
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

  it('should not be able to Authenticate with a non-existing user', async () => {
    await expect(
      authenticateUser.execute({
        email: 'non-user',
        password: '123123',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to Authenticate with incorrect password', async () => {
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

    await expect(
      authenticateUser.execute({
        email: 'fmrocha@gmail.com',
        password: '654321',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
