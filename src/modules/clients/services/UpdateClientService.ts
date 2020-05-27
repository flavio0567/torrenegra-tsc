import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IClientsRepository from '../repositories/IClientsRepository';

import Client from '../infra/typeorm/entities/Client';

interface IRequest {
  client_id: string;
  cnpj: string;
  corporate_name: string;
  trading_name: string;
  hourly_cost: number;
  payment_deadline: number;
}

@injectable()
class UpdateClientService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository
  ) {}

  public async execute({
    client_id,
    cnpj,
    corporate_name,
    trading_name,
    hourly_cost,
    payment_deadline,
  }: IRequest): Promise<Client> {
    const client = await this.clientsRepository.findById(client_id);

    if (!client) {
      throw new AppError('Client not found.');
    }

    client.cnpj = cnpj;
    client.corporate_name = corporate_name;
    client.trading_name = trading_name;
    client.hourly_cost = hourly_cost;
    client.payment_deadline = payment_deadline;

    return this.clientsRepository.save(client);
  }
}

export default UpdateClientService;
