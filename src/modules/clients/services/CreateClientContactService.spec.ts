import FakeClientsRepository from '../repositories/fakes/FakeClientsRepository';
import CreateClientService from './CreateClientService';

import FakeClientContactsRepository from '../repositories/fakes/FakeClientContactsRepository';
import CreateClientContactService from './CreateClientContactService';

let fakeClientsRepository: FakeClientsRepository;
let createClient: CreateClientService;

let fakeClientContactsRepository: FakeClientContactsRepository;
let createClientContact: CreateClientContactService;

describe('CreateClientContactService', () => {
  beforeEach(() => {
    fakeClientsRepository = new FakeClientsRepository();
    createClient = new CreateClientService(fakeClientsRepository);

    fakeClientContactsRepository = new FakeClientContactsRepository();
    createClientContact = new CreateClientContactService(
      fakeClientContactsRepository
    );
  });

  it('should be able to create a new client contact', async () => {
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

    expect(clientContact).toHaveProperty('id');
  });
});
