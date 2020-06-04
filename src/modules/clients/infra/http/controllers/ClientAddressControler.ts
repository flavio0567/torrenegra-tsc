import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateClientAddressService from '@modules/clients/services/CreateClientAddressService';
import UpdateClientAddressService from '@modules/clients/services/UpdateClientAddressService';
import DeleteClientAddressService from '@modules/clients/services/DeleteClientAddressService';

export default class ClientAddressController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { street_1, street_2, city, state, zip_code } = req.body;

    const { client_id } = req.params;

    const createClientAddress = container.resolve(CreateClientAddressService);

    const clientAddress = await createClientAddress.execute({
      client_id,
      street_1,
      street_2,
      city,
      state,
      zip_code,
    });

    return res.json(clientAddress);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { street_1, street_2, city, state, zip_code } = req.body;

    const { id } = req.params;

    const updatedClientAddress = container.resolve(UpdateClientAddressService);

    const clientAddress = await updatedClientAddress.execute({
      id,
      street_1,
      street_2,
      city,
      state,
      zip_code,
    });

    return res.json(clientAddress);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deletedClient = container.resolve(DeleteClientAddressService);

    await deletedClient.execute({
      id,
    });

    return res.json();
  }
}
