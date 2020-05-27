import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IClientsRepository from '../repositories/IClientsRepository';
import Client from '../infra/typeorm/entities/Client';

interface IRequest {
  cnpj: string;
  corporate_name: string;
  trading_name: string;
  hourly_cost: number;
  payment_deadline: number;
}

@injectable()
class CreateClientService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository
  ) {}

  public async execute({
    cnpj,
    corporate_name,
    trading_name,
    hourly_cost,
    payment_deadline,
  }: IRequest): Promise<Client> {
    const checkClientExists = await this.clientsRepository.findByCnpj(cnpj);

    if (checkClientExists) {
      throw new AppError('Cnpj already used.', 401);
    }

    const client = await this.clientsRepository.create({
      cnpj,
      corporate_name,
      trading_name,
      hourly_cost,
      payment_deadline,
    });

    return client;
  }
}

export default CreateClientService;
