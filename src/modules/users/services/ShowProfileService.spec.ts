import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('UpdateProfileService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showProfile = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able to show the profile', async () => {
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

    const updatedUser = await showProfile.execute({
      user_id: user.id,
    });

    expect(updatedUser.first_name).toBe('Flavio');
    expect(updatedUser.last_name).toBe('Rocha');
    expect(updatedUser.email).toBe('fmrocha@gmail.com');
    expect(updatedUser.position).toBe('Project Manager');
    expect(updatedUser.hourly_cost).toBe(145);
    expect(updatedUser.is_admin).toBe(0);
    expect(updatedUser.is_active).toBe(0);
  });

  it('should not be able to show a non-existing profile', async () => {
    await expect(
      showProfile.execute({
        user_id: 'non-existing-profile',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
