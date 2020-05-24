import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfileService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider
    );
  });

  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      first_name: 'Flavio',
      last_name: 'Rocha',
      email: 'fmrocha@gmail.com',
      password_hash: '123456',
      position: 'Project Manager',
      hourly_cost: 145,
      is_admin: 0,
      is_active: 0,
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      first_name: 'Chico',
      last_name: 'Rocha',
      email: 'chico@gmail.com',
    });

    expect(updatedUser.first_name).toBe('Chico');
    expect(updatedUser.last_name).toBe('Rocha');
    expect(updatedUser.email).toBe('chico@gmail.com');
  });

  it('should not be able to update a non-existing profile', async () => {
    await expect(
      updateProfile.execute({
        user_id: 'non-existing-profile',
        first_name: 'Chico',
        last_name: 'Rocha',
        email: 'chico@gmail.com',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change a email for a pre-existing email', async () => {
    await fakeUsersRepository.create({
      first_name: 'Flavio',
      last_name: 'Rocha',
      email: 'fmrocha@gmail.com',
      password_hash: '123456',
      position: 'Project Manager',
      hourly_cost: 145,
      is_admin: 0,
      is_active: 0,
    });

    const user = await fakeUsersRepository.create({
      first_name: 'Test',
      last_name: 'Test',
      email: 'test@gmail.com',
      password_hash: '123456',
      position: 'Project Manager',
      hourly_cost: 145,
      is_admin: 0,
      is_active: 0,
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        first_name: 'Test',
        last_name: 'Test',
        email: 'fmrocha@gmail.com',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password informing a correct old password', async () => {
    const user = await fakeUsersRepository.create({
      first_name: 'Flavio',
      last_name: 'Rocha',
      email: 'fmrocha@gmail.com',
      password_hash: '123456',
      position: 'Project Manager',
      hourly_cost: 145,
      is_admin: 0,
      is_active: 0,
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      first_name: 'Flavio',
      last_name: 'Rocha',
      email: 'fmrocha@gmail.com',
      old_password: '123456',
      password: '123123',
    });

    expect(updatedUser.password_hash).toBe('123123');
  });

  it('should not be able to update a password whitout informing an old_password', async () => {
    const user = await fakeUsersRepository.create({
      first_name: 'Flavio',
      last_name: 'Rocha',
      email: 'fmrocha@gmail.com',
      password_hash: '123456',
      position: 'Project Manager',
      hourly_cost: 145,
      is_admin: 0,
      is_active: 0,
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        first_name: 'Chico',
        last_name: 'Rocha',
        email: 'chico@gmail.com',
        password: '123123',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password informing a wrong password', async () => {
    const user = await fakeUsersRepository.create({
      first_name: 'Flavio',
      last_name: 'Rocha',
      email: 'fmrocha@gmail.com',
      password_hash: '123456',
      position: 'Project Manager',
      hourly_cost: 145,
      is_admin: 0,
      is_active: 0,
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        first_name: 'Flavio',
        last_name: 'Rocha',
        email: 'fmrocha@gmail.com',
        old_password: 'wrong-old-password',
        password: '123123',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
