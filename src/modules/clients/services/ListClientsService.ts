import { injectable, inject } from 'tsyringe';

import IClientsRepository from '../repositories/IClientsRepository';

import Client from '../infra/typeorm/entities/Client';

@injectable()
class ListClientsService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository
  ) {}

  public async execute(): Promise<Client[] | null> {
    const clients = await this.clientsRepository.findAllClients();

    return clients || null;
  }
}

export default ListClientsService;
