import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IClientAddressesRepository from '../repositories/IClientAddressesRepository';

import Address from '../infra/typeorm/entities/Address';

interface IRequest {
  id: string;
  street_1: string;
  street_2: string;
  city: string;
  state: string;
  zip_code: string;
}

@injectable()
class UpdateClientAddresseService {
  constructor(
    @inject('ClientAddressesRepository')
    private clientAddressesRepository: IClientAddressesRepository
  ) {}

  public async execute({
    id,
    street_1,
    street_2,
    city,
    state,
    zip_code,
  }: IRequest): Promise<Address> {
    const clientAddress = await this.clientAddressesRepository.findById(id);

    if (!clientAddress) {
      throw new AppError('Client address not found.');
    }

    clientAddress.street_1 = street_1;
    clientAddress.street_2 = street_2;
    clientAddress.city = city;
    clientAddress.state = state;
    clientAddress.zip_code = zip_code;

    return this.clientAddressesRepository.save(clientAddress);
  }
}

export default UpdateClientAddresseService;
