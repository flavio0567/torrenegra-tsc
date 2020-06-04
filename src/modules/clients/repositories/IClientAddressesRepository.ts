import Address from '../infra/typeorm/entities/Address';

import ICreateClientAddressDTO from '../dtos/ICreateClientAddressDTO';

export default interface IClientAddressesRepository {
  findById(id: string): Promise<Address | undefined>;
  create(data: ICreateClientAddressDTO): Promise<Address>;
  delete(id: string): Promise<void>;
  save(address: Address): Promise<Address>;
}
