import FakeClientsRepository from '../repositories/fakes/FakeClientsRepository';
import CreateClientService from './CreateClientService';

import FakeClientAddressesRepository from '../repositories/fakes/FakeClientAddressesRepository';
import CreateClientAddressService from './CreateClientAddressService';

let fakeClientsRepository: FakeClientsRepository;
let createClient: CreateClientService;

let fakeClientAddressesRepository: FakeClientAddressesRepository;
let createClientAddress: CreateClientAddressService;

describe('CreateClientAddresseservice', () => {
  beforeEach(() => {
    fakeClientsRepository = new FakeClientsRepository();
    createClient = new CreateClientService(fakeClientsRepository);

    fakeClientAddressesRepository = new FakeClientAddressesRepository();
    createClientAddress = new CreateClientAddressService(
      fakeClientAddressesRepository
    );
  });

  it('should be able to create a new client address', async () => {
    const client = await createClient.execute({
      cnpj: '12345678901',
      corporate_name: 'Test Company 1',
      trading_name: 'Comp1',
      hourly_cost: 123.0,
      payment_deadline: 32,
    });

    const clientAddress = await createClientAddress.execute({
      client_id: client.id,
      street_1: '4447 Roscommon way',
      street_2: '',
      city: 'Dublin',
      state: 'CA',
      zip_code: '94568',
    });

    expect(clientAddress).toHaveProperty('id');
  });
});
