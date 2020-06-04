import Contact from '../infra/typeorm/entities/Contact';
import ICreateClientContactDTO from '../dtos/ICreateClientContactDTO';

export default interface IClientContactRepository {
  findAllClientContacts(): Promise<Contact[] | undefined>;
  findById(clientContact_id: string): Promise<Contact | undefined>;
  create(data: ICreateClientContactDTO): Promise<Contact>;
  delete(clientContact_id: string): Promise<void>;
  save(contact: Contact): Promise<Contact>;
}
