import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IClientContactsRepository from '../repositories/IClientContactsRepository';

interface IRequest {
  clientContact_id: string;
}

@injectable()
class DeleteClientContactService {
  constructor(
    @inject('ClientContactsRepository')
    private clientContactsRepository: IClientContactsRepository
  ) {}

  public async execute({ clientContact_id }: IRequest): Promise<void> {
    const clientContact = await this.clientContactsRepository.findById(
      clientContact_id
    );

    if (!clientContact) {
      throw new AppError('Client contact not found.');
    }

    await this.clientContactsRepository.delete(clientContact_id);
  }
}

export default DeleteClientContactService;
