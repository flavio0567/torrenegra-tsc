import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IClientContactsRepository from '../repositories/IClientContactsRepository';

interface IRequest {
  id: string;
}

@injectable()
class DeleteClientContactService {
  constructor(
    @inject('ClientContactsRepository')
    private clientContactsRepository: IClientContactsRepository
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    const clientContact = await this.clientContactsRepository.findById(id);

    if (!clientContact) {
      throw new AppError('Client contact not found.');
    }

    await this.clientContactsRepository.delete(id);
  }
}

export default DeleteClientContactService;
