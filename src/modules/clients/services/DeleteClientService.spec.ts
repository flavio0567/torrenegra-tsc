import AppError from '@shared/errors/AppError';

import FakeClientsRepository from '../repositories/fakes/FakeClientsRepository';
import DeleteClientService from './DeleteClientService';

let fakeClientsRepository: FakeClientsRepository;
let deleteClient: DeleteClientService;

describe('DeleteClientService', () => {
  beforeEach(() => {
    fakeClientsRepository = new FakeClientsRepository();

    deleteClient = new DeleteClientService(fakeClientsRepository);
  });

  it('should be able to Delete a client information', async () => {
    const client = await fakeClientsRepository.create({
      cnpj: '12345678901',
      corporate_name: 'Test Company 1',
      trading_name: 'Comp1',
      hourly_cost: 123.0,
      payment_deadline: 32,
    });

    const deletedClient = await deleteClient.execute({
      client_id: client.id,
    });

    expect(deletedClient).toBeUndefined();
  });

  it('should not be able to Delete a non-existing or wrong client id', async () => {
    await expect(
      deleteClient.execute({
        client_id: 'non-existing-id',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
