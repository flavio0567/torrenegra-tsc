import AppError from '@shared/errors/AppError';

import FakeClientsRepository from '../repositories/fakes/FakeClientsRepository';
import FakeClientContactsRepository from '../repositories/fakes/FakeClientContactsRepository';

import CreateClientService from './CreateClientService';
import CreateClientContactService from './CreateClientContactService';
import DeleteClientContactService from './DeleteClientContactService';

let fakeClientsRepository: FakeClientsRepository;
let fakeClientContactsRepository: FakeClientContactsRepository;
let createClient: CreateClientService;
let createClientContact: CreateClientContactService;
let deleteClientContact: DeleteClientContactService;

describe('DeleteClientContactService', () => {
  beforeEach(() => {
    fakeClientsRepository = new FakeClientsRepository();
    createClient = new CreateClientService(fakeClientsRepository);

    fakeClientContactsRepository = new FakeClientContactsRepository();

    createClientContact = new CreateClientContactService(
      fakeClientContactsRepository
    );

    deleteClientContact = new DeleteClientContactService(
      fakeClientContactsRepository
    );
  });

  it('should be able to Delete a client contact information', async () => {
    const client = await createClient.execute({
      cnpj: '12345678901',
      corporate_name: 'Test Company 1',
      trading_name: 'Comp1',
      hourly_cost: 123.0,
      payment_deadline: 32,
    });

    const createContact = jest.spyOn(fakeClientContactsRepository, 'create');

    const clientContact = await createClientContact.execute({
      client_id: client.id,
      name: 'First client contact',
      email: 'first@gmail.com',
      phone: 9254778181,
      other: '@firstskype',
      main_contact: 1,
    });

    const deletedClientContact = await deleteClientContact.execute({
      id: clientContact.id,
    });

    expect(createContact).toHaveBeenCalledWith({
      client_id: client.id,
      name: 'First client contact',
      email: 'first@gmail.com',
      phone: 9254778181,
      other: '@firstskype',
      main_contact: 1,
    });
    expect(deletedClientContact).toBeUndefined();
  });

  it('should not be able to Delete a non-existing client contact', async () => {
    await expect(
      deleteClientContact.execute({
        id: 'non-existing-contact',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
