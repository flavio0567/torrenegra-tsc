import { uuid } from 'uuidv4';

import IClientContactsRepository from '@modules/clients/repositories/IClientContactsRepository';
import ICreateClientContactDTO from '@modules/clients/dtos/ICreateClientContactDTO';

import Contact from '@modules/clients/infra/typeorm/entities/Contact';

class FakeClientContactsRepository implements IClientContactsRepository {
  private clientContacts: Contact[] = [];

  public async findAllContacts(): Promise<Contact[] | undefined> {
    const { clientContacts } = this;

    return clientContacts;
  }

  public async findById(id: string): Promise<Contact | undefined> {
    const findContactById = this.clientContacts.find(
      contact => contact.id === id
    );

    return findContactById;
  }

  public async create(contactData: ICreateClientContactDTO): Promise<Contact> {
    const contact = new Contact();

    Object.assign(contact, { id: uuid() }, contactData);

    this.clientContacts.push(contact);

    return contact;
  }

  public async delete(contact_id: string): Promise<void> {
    const findIndex = this.clientContacts.findIndex(
      contact => contact.id === contact_id
    );

    this.clientContacts.splice(findIndex, 0);
  }

  public async save(contact: Contact): Promise<Contact> {
    const findIndex = this.clientContacts.findIndex(
      saveClient => saveClient.id === contact.id
    );

    this.clientContacts[findIndex] = contact;

    return contact;
  }
}

export default FakeClientContactsRepository;
