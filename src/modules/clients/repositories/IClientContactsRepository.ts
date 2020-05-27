import Contact from '../infra/typeorm/entities/Contact';
import ICreateClientContactDTO from '../dtos/ICreateClientContactDTO';

export default interface IClientContactRepository {
  findById(id: string): Promise<Contact | undefined>;
  create(data: ICreateClientContactDTO): Promise<Contact>;
  save(contact: Contact): Promise<Contact>;
}
