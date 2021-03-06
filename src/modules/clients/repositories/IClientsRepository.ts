import Client from '../infra/typeorm/entities/Client';
import ICreateClientDTO from '../dtos/ICreateClientDTO';

export default interface IClientRepository {
  findAllClients(): Promise<Client[] | undefined>;
  findByCnpj(cnpj: string): Promise<Client | undefined>;
  findById(client_id: string): Promise<Client | undefined>;
  create(data: ICreateClientDTO): Promise<Client>;
  delete(client_id: string): Promise<void>;
  save(user: Client): Promise<Client>;
}
