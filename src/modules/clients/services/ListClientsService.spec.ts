import FakeClientsRepository from '../repositories/fakes/FakeClientsRepository';
import ListClientsService from './ListClientsService';

let fakeClientsRepository: FakeClientsRepository;
let listClients: ListClientsService;

describe('ListClientService', () => {
  beforeEach(() => {
    fakeClientsRepository = new FakeClientsRepository();

    listClients = new ListClientsService(fakeClientsRepository);
  });

  it('should be able to list clients', async () => {
    const client1 = await fakeClientsRepository.create({
      cnpj: '12345678901',
      corporate_name: 'Test Company 1',
      trading_name: 'Comp1',
      hourly_cost: 123.0,
      payment_deadline: 32,
    });

    const client2 = await fakeClientsRepository.create({
      cnpj: '12312312399',
      corporate_name: 'Test Company 2',
      trading_name: 'Comp2',
      hourly_cost: 456.0,
      payment_deadline: 34,
    });

    const clients = await listClients.execute();

    expect(clients).toEqual([client1, client2]);
  });
});
