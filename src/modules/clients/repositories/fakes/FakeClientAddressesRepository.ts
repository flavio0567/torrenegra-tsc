import { uuid } from 'uuidv4';

import IClientAddressesRepository from '@modules/clients/repositories/IClientAddressesRepository';
import ICreateClientAddressDTO from '@modules/clients/dtos/ICreateClientAddressDTO';

import Address from '@modules/clients/infra/typeorm/entities/Address';

class FakeClientAddressesRepository implements IClientAddressesRepository {
  private clientAddresses: Address[] = [];

  public async findById(id: string): Promise<Address | undefined> {
    const findAddressById = this.clientAddresses.find(
      address => address.id === id
    );

    return findAddressById;
  }

  public async create(addressData: ICreateClientAddressDTO): Promise<Address> {
    const address = new Address();

    Object.assign(address, { id: uuid() }, addressData);

    this.clientAddresses.push(address);

    return address;
  }

  public async delete(address_id: string): Promise<void> {
    const findIndex = this.clientAddresses.findIndex(
      address => address.id === address_id
    );

    this.clientAddresses.splice(findIndex, 0);
  }

  public async save(address: Address): Promise<Address> {
    const findIndex = this.clientAddresses.findIndex(
      saveAddress => saveAddress.id === address.id
    );

    this.clientAddresses[findIndex] = address;

    return address;
  }
}

export default FakeClientAddressesRepository;
