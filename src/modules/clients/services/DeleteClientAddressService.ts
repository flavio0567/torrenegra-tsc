import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IClientAddressesRepository from '../repositories/IClientAddressesRepository';

interface IRequest {
  id: string;
}

@injectable()
class DeleteClientAddressService {
  constructor(
    @inject('ClientAddressesRepository')
    private clientAddressesRepository: IClientAddressesRepository
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    const clientAddress = await this.clientAddressesRepository.findById(id);

    if (!clientAddress) {
      throw new AppError('Client address not found.');
    }

    await this.clientAddressesRepository.delete(id);
  }
}

export default DeleteClientAddressService;
