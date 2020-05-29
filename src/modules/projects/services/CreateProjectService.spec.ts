import AppError from '@shared/errors/AppError';

import FakeClientsRepository from '@modules/clients/repositories/fakes/FakeClientsRepository';
import CreateClientService from '@modules/clients/services/CreateClientService';
import FakeProjectsRepository from '../repositories/fakes/FakeProjectsRepository';
import CreateProjectService from './CreateProjectService';

let fakeProjectsRepository: FakeProjectsRepository;
let createProject: CreateProjectService;

let fakeClientsRepository: FakeClientsRepository;
let createClient: CreateClientService;

describe('CreateProjectService', () => {
  beforeEach(() => {
    fakeProjectsRepository = new FakeProjectsRepository();

    createProject = new CreateProjectService(fakeProjectsRepository);

    fakeClientsRepository = new FakeClientsRepository();

    createClient = new CreateClientService(fakeClientsRepository);
  });

  it('should be able to create a new project', async () => {
    const client = await createClient.execute({
      cnpj: '12345678901',
      corporate_name: 'Test Company 1',
      trading_name: 'Comp1',
      hourly_cost: 123.0,
      payment_deadline: 32,
    });

    const project = await createProject.execute({
      client_id: client.id,
      code: 'YP-001-20',
      description: 'Instalação de Sistema ( Interno)',
      hour_plc: 100,
      hour_ihm: 0,
      is_blocked: 0,
      order_code: 'YP-001-20',
      order_value: 120000,
      status: 1,
      value_third_party: 0,
      value_material: 0,
      value_travel: 0,
    });

    expect(project).toHaveProperty('id');
  });

  it('should not be able to create a project that already exists', async () => {
    const client = await createClient.execute({
      cnpj: '12345678901',
      corporate_name: 'Test Company 1',
      trading_name: 'Comp1',
      hourly_cost: 123.0,
      payment_deadline: 32,
    });

    await createProject.execute({
      client_id: client.id,
      code: 'YP-001-20',
      description: 'Instalação de Sistema ( Interno)',
      hour_plc: 100,
      hour_ihm: 0,
      is_blocked: 0,
      order_code: 'YP-001-20',
      order_value: 120000,
      status: 1,
      value_third_party: 0,
      value_material: 0,
      value_travel: 0,
    });

    await expect(
      createProject.execute({
        client_id: client.id,
        code: 'YP-001-20',
        description: 'Instalação de Sistema ( Interno)',
        hour_plc: 100,
        hour_ihm: 0,
        is_blocked: 0,
        order_code: 'YP-001-20',
        order_value: 120000,
        status: 1,
        value_third_party: 0,
        value_material: 0,
        value_travel: 0,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
