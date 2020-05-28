import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IClientContactsRepository from '../repositories/IClientContactsRepository';

import Contact from '../infra/typeorm/entities/Contact';

interface IRequest {
  id: string;
  name: string;
  email: string;
  phone: number;
  other: string;
  main_contact: number;
}

@injectable()
class UpdateClientContactService {
  constructor(
    @inject('ClientsRepository')
    private clientContactsRepository: IClientContactsRepository
  ) {}

  public async execute({
    id,
    name,
    email,
    phone,
    other,
    main_contact,
  }: IRequest): Promise<Contact> {
    const clientContact = await this.clientContactsRepository.findById(id);

    if (!clientContact) {
      throw new AppError('Client contact not found.');
    }

    clientContact.name = name;
    clientContact.email = email;
    clientContact.phone = phone;
    clientContact.other = other;
    clientContact.main_contact = main_contact;

    return this.clientContactsRepository.save(clientContact);
  }
}

export default UpdateClientContactService;
