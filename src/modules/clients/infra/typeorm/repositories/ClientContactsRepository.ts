import { getRepository, Repository } from 'typeorm';

import IClientContactsRepository from '@modules/clients/repositories/IClientContactsRepository';
import ICreateClientContactDTO from '@modules/clients/dtos/ICreateClientContactDTO';

import Contact from '../entities/Contact';

class ClientContactsRepository implements IClientContactsRepository {
  private ormRepository: Repository<Contact>;

  constructor() {
    this.ormRepository = getRepository(Contact);
  }

  public async findAllClientContacts(): Promise<Contact[] | undefined> {
    const contacts = await this.ormRepository.find();

    return contacts || undefined;
  }

  public async findById(id: string): Promise<Contact | undefined> {
    const findContact = await this.ormRepository.findOne(id);

    return findContact;
  }

  public async create({
    client_id,
    name,
    email,
    phone,
    other,
    main_contact,
  }: ICreateClientContactDTO): Promise<Contact> {
    const contact = this.ormRepository.create({
      client_id,
      name,
      email,
      phone,
      other,
      main_contact,
    });

    await this.ormRepository.save(contact);

    return contact;
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  public async save(contact: Contact): Promise<Contact> {
    return this.ormRepository.save(contact);
  }
}

export default ClientContactsRepository;
