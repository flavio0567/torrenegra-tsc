import AppError from '@shared/errors/AppError';

import FakeClientsRepository from '../repositories/fakes/FakeClientsRepository';
import CreateClientService from './CreateClientService';

import FakeClientAddressesRepository from '../repositories/fakes/FakeClientAddressesRepository';
import CreateClientAddressService from './CreateClientAddressService';
import UpdateClientAddressService from './UpdateClientAddressService';

let fakeClientsRepository: FakeClientsRepository;
let createClient: CreateClientService;

let fakeClientAddressesRepository: FakeClientAddressesRepository;
let createClientAddress: CreateClientAddressService;
let updateClientAddress: UpdateClientAddressService;

describe('UpdateClientAddressService', () => {
  beforeEach(() => {
    fakeClientsRepository = new FakeClientsRepository();
    createClient = new CreateClientService(fakeClientsRepository);

    fakeClientAddressesRepository = new FakeClientAddressesRepository();

    createClientAddress = new CreateClientAddressService(
      fakeClientAddressesRepository
    );

    updateClientAddress = new UpdateClientAddressService(
      fakeClientAddressesRepository
    );
  });

  it('should be able to update a client address information', async () => {
    const client = await createClient.execute({
      cnpj: '12345678901',
      corporate_name: 'Test Company 1',
      trading_name: 'Comp1',
      hourly_cost: 123.0,
      payment_deadline: 32,
    });

    const clientAddress = await createClientAddress.execute({
      client_id: client.id,
      street_1: '4447 Roscommon Way',
      street_2: '',
      city: 'Dublin',
      state: 'CA',
      zip_code: '94568',
    });

    const updatedClientAddress = await updateClientAddress.execute({
      id: clientAddress.id,
      street_1: '2620 Camino Ramon',
      street_2: 'room 2478',
      city: 'San Ramon',
      state: 'CA',
      zip_code: '94599',
    });

    expect(updatedClientAddress.street_1).toBe('2620 Camino Ramon');
    expect(updatedClientAddress.street_2).toBe('room 2478');
    expect(updatedClientAddress.city).toBe('San Ramon');
    expect(updatedClientAddress.state).toBe('CA');
    expect(updatedClientAddress.zip_code).toBe('94599');
  });

  it('should not be able to update a non-existing or wrong client address id', async () => {
    await expect(
      updateClientAddress.execute({
        id: 'non-existing-id',
        street_1: '2620 Camino Ramon',
        street_2: 'room 2478',
        city: 'San Ramon',
        state: 'CA',
        zip_code: '94599',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
