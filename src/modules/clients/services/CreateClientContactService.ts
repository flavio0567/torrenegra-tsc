import { injectable, inject } from 'tsyringe';

import IClientContactsRepository from '../repositories/IClientContactsRepository';
import Contact from '../infra/typeorm/entities/Contact';

interface IRequest {
  client_id: string;
  name: string;
  email: string;
  phone: number;
  other: string;
  main_contact: number;
}

@injectable()
class CreateClientContactService {
  constructor(
    @inject('ClientContactsRepository')
    private clientContactsRepository: IClientContactsRepository
  ) {}

  public async execute({
    client_id,
    name,
    email,
    phone,
    other,
    main_contact,
  }: IRequest): Promise<Contact> {
    const clientContact = await this.clientContactsRepository.create({
      client_id,
      name,
      email,
      phone,
      other,
      main_contact,
    });

    return clientContact;
  }
}

export default CreateClientContactService;
