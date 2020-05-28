import AppError from '@shared/errors/AppError';

import FakeClientsRepository from '../repositories/fakes/FakeClientsRepository';
import CreateClientService from './CreateClientService';

let fakeClientsRepository: FakeClientsRepository;
let createClient: CreateClientService;

describe('UpdateProfileService', () => {
  beforeEach(() => {
    fakeClientsRepository = new FakeClientsRepository();

    createClient = new CreateClientService(fakeClientsRepository);
  });

  it('should be able to create a new client', async () => {
    const client = await createClient.execute({
      cnpj: '12345678901',
      corporate_name: 'Test Company 1',
      trading_name: 'Comp1',
      hourly_cost: 123.0,
      payment_deadline: 32,
    });

    expect(client).toHaveProperty('id');
  });

  it('should not be able to create a client that already exists', async () => {
    await createClient.execute({
      cnpj: '12345678901',
      corporate_name: 'Test Company 1',
      trading_name: 'Comp1',
      hourly_cost: 123.0,
      payment_deadline: 32,
    });

    await expect(
      createClient.execute({
        cnpj: '12345678901',
        corporate_name: 'Test Company 2',
        trading_name: 'Comp2',
        hourly_cost: 134.0,
        payment_deadline: 34,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
