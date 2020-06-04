import { injectable, inject } from 'tsyringe';

import IClientAddressesRepository from '../repositories/IClientAddressesRepository';
import Address from '../infra/typeorm/entities/Address';

interface IRequest {
  client_id: string;
  street_1: string;
  street_2: string;
  city: string;
  state: string;
  zip_code: string;
}

@injectable()
class CreateClientAddressService {
  constructor(
    @inject('ClientAddressesRepository')
    private clientAddressesRepository: IClientAddressesRepository
  ) {}

  public async execute({
    client_id,
    street_1,
    street_2,
    city,
    state,
    zip_code,
  }: IRequest): Promise<Address> {
    const clientAddress = await this.clientAddressesRepository.create({
      client_id,
      street_1,
      street_2,
      city,
      state,
      zip_code,
    });

    return clientAddress;
  }
}

export default CreateClientAddressService;
