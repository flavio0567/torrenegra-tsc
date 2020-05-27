import Address from '../infra/typeorm/entities/Address';

import ICreateClientAddressDTO from '../dtos/ICreateClientAddressDTO';

export default interface IClientAddressesRepository {
  findById(id: string): Promise<Address | undefined>;
  create(data: ICreateClientAddressDTO): Promise<Address>;
  save(address: Address): Promise<Address>;
}
