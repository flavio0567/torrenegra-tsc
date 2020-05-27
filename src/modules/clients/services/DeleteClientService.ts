import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IClientsRepository from '../repositories/IClientsRepository';

interface IRequest {
  client_id: string;
}

@injectable()
class DeleteClientService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository
  ) {}

  public async execute({ client_id }: IRequest): Promise<void> {
    const client = await this.clientsRepository.findById(client_id);

    if (!client) {
      throw new AppError('Client not found.');
    }

    this.clientsRepository.delete(client.id);
  }
}

export default DeleteClientService;
