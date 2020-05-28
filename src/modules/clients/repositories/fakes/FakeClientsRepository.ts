import { uuid } from 'uuidv4';

import IClientsRepository from '@modules/clients/repositories/IClientsRepository';
import ICreateClientDTO from '@modules/clients/dtos/ICreateClientDTO';

import Client from '@modules/clients/infra/typeorm/entities/Client';

class FakeClientsRepository implements IClientsRepository {
  private clients: Client[] = [];

  public async findAllClients(): Promise<Client[] | undefined> {
    const { clients } = this;

    return clients || undefined;
  }

  public async findById(id: string): Promise<Client | undefined> {
    const findClientById = this.clients.find(client => client.id === id);

    return findClientById;
  }

  public async findByCnpj(cnpj: string): Promise<Client | undefined> {
    const findByCnpjClient = this.clients.find(client => client.cnpj === cnpj);

    return findByCnpjClient || undefined;
  }

  public async create(clientData: ICreateClientDTO): Promise<Client> {
    const client = new Client();

    Object.assign(client, { id: uuid() }, clientData);

    this.clients.push(client);

    return client;
  }

  public async delete(client_id: string): Promise<void> {
    const findIndex = this.clients.findIndex(client => client.id === client_id);

    this.clients.splice(findIndex, 0);
  }

  public async save(client: Client): Promise<Client> {
    const findIndex = this.clients.findIndex(
      saveClient => saveClient.id === client.id
    );

    this.clients[findIndex] = client;

    return client;
  }
}

export default FakeClientsRepository;
