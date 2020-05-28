import { getRepository, Repository } from 'typeorm';

import IClientsRepository from '@modules/clients/repositories/IClientsRepository';
import ICreateClientDTO from '@modules/clients/dtos/ICreateClientDTO';

import Client from '../entities/Client';

class ClientsRepository implements IClientsRepository {
  private ormRepository: Repository<Client>;

  constructor() {
    this.ormRepository = getRepository(Client);
  }

  public async findAllClients(): Promise<Client[] | undefined> {
    const clients = await this.ormRepository.find();

    return clients || undefined;
  }

  public async findByCnpj(cnpj: string): Promise<Client | undefined> {
    const client = await this.ormRepository.findOne({
      where: { cnpj },
    });

    return client || undefined;
  }

  public async findById(id: string): Promise<Client | undefined> {
    const findClient = await this.ormRepository.findOne(id);

    return findClient;
  }

  public async create({
    cnpj,
    corporate_name,
    trading_name,
    hourly_cost,
    payment_deadline,
  }: ICreateClientDTO): Promise<Client> {
    const client = this.ormRepository.create({
      cnpj,
      corporate_name,
      trading_name,
      hourly_cost,
      payment_deadline,
    });

    await this.ormRepository.save(client);

    return client;
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  public async save(client: Client): Promise<Client> {
    return this.ormRepository.save(client);
  }
}

export default ClientsRepository;
