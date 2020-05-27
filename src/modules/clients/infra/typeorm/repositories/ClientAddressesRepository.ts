import { getRepository, Repository } from 'typeorm';

import IClientAddressesRepository from '@modules/clients/repositories/IClientAddressesRepository';
import ICreateClientAddressDTO from '@modules/clients/dtos/ICreateClientAddressDTO';

import Address from '../entities/Address';

class ClientAddressesRepository implements IClientAddressesRepository {
  private ormRepository: Repository<Address>;

  constructor() {
    this.ormRepository = getRepository(Address);
  }

  public async findById(id: string): Promise<Address | undefined> {
    const findAddress = await this.ormRepository.findOne(id);

    return findAddress;
  }

  public async create({
    client_id,
    street_1,
    street_2,
    city,
    state,
    zip_code,
  }: ICreateClientAddressDTO): Promise<Address> {
    const address = this.ormRepository.create({
      client_id,
      street_1,
      street_2,
      city,
      state,
      zip_code,
    });

    await this.ormRepository.save(address);

    return address;
  }

  public async save(address: Address): Promise<Address> {
    return this.ormRepository.save(address);
  }
}

export default ClientAddressesRepository;
