import AppError from '@shared/errors/AppError';

import FakeClientsRepository from '../repositories/fakes/FakeClientsRepository';
import UpdateClientService from './UpdateClientService';

let fakeClientsRepository: FakeClientsRepository;
let updateClient: UpdateClientService;

describe('UpdateClientService', () => {
  beforeEach(() => {
    fakeClientsRepository = new FakeClientsRepository();

    updateClient = new UpdateClientService(fakeClientsRepository);
  });

  it('should be able to update a client information', async () => {
    const client = await fakeClientsRepository.create({
      cnpj: '12345678901',
      corporate_name: 'Test Company 1',
      trading_name: 'Comp1',
      hourly_cost: 123.0,
      payment_deadline: 32,
    });

    const updatedClient = await updateClient.execute({
      client_id: client.id,
      cnpj: '99999999999',
      corporate_name: 'Updated Company 1',
      trading_name: 'Updated Comp1',
      hourly_cost: 999.0,
      payment_deadline: 99,
    });

    expect(updatedClient.id).toBe(client.id);
    expect(updatedClient.cnpj).toBe('99999999999');
    expect(updatedClient.corporate_name).toBe('Updated Company 1');
    expect(updatedClient.trading_name).toBe('Updated Comp1');
    expect(updatedClient.hourly_cost).toBe(999.0);
    expect(updatedClient.payment_deadline).toBe(99);
  });

  it('should not be able to update a non-existing or wrong client id', async () => {
    await expect(
      updateClient.execute({
        client_id: 'non-existing-id',
        cnpj: '99999999999',
        corporate_name: 'Updated Company 1',
        trading_name: 'Updated Comp1',
        hourly_cost: 999.0,
        payment_deadline: 99,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
