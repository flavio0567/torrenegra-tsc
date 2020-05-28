import AppError from '@shared/errors/AppError';

import FakeClientsRepository from '../repositories/fakes/FakeClientsRepository';
import CreateClientService from './CreateClientService';

import FakeClientContactsRepository from '../repositories/fakes/FakeClientContactsRepository';
import CreateClientContactService from './CreateClientContactService';
import UpdateClientContactService from './UpdateClientContactService';

let fakeClientsRepository: FakeClientsRepository;
let createClient: CreateClientService;

let fakeClientContactsRepository: FakeClientContactsRepository;
let createClientContact: CreateClientContactService;
let updateClientContact: UpdateClientContactService;

describe('UpdateClientContactService', () => {
  beforeEach(() => {
    fakeClientsRepository = new FakeClientsRepository();
    createClient = new CreateClientService(fakeClientsRepository);

    fakeClientContactsRepository = new FakeClientContactsRepository();

    createClientContact = new CreateClientContactService(
      fakeClientContactsRepository
    );

    updateClientContact = new UpdateClientContactService(
      fakeClientContactsRepository
    );
  });

  it('should be able to update a client contact information', async () => {
    const client = await createClient.execute({
      cnpj: '12345678901',
      corporate_name: 'Test Company 1',
      trading_name: 'Comp1',
      hourly_cost: 123.0,
      payment_deadline: 32,
    });

    const clientContact = await createClientContact.execute({
      client_id: client.id,
      name: 'First client contact',
      email: 'first@gmail.com',
      phone: 9254778181,
      other: '@firstskype',
      main_contact: 1,
    });

    const updatedClient = await updateClientContact.execute({
      id: clientContact.id,
      name: 'First modified',
      email: 'first_modified@gmail.com',
      phone: 90000000001,
      other: '@first_Modifiedskype',
      main_contact: 0,
    });

    expect(updatedClient.client_id).toBe(client.id);
    expect(updatedClient.name).toBe('First modified');
    expect(updatedClient.email).toBe('first_modified@gmail.com');
    expect(updatedClient.phone).toBe(90000000001);
    expect(updatedClient.other).toBe('@first_Modifiedskype');
  });

  it('should not be able to update a non-existing or wrong client contact id', async () => {
    await expect(
      updateClientContact.execute({
        id: 'non-existing-id',
        name: 'First modified',
        email: 'first_modified@gmail.com',
        phone: 90000000001,
        other: '@first_Modifiedskype',
        main_contact: 0,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
