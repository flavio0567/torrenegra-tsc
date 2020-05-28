import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateClientService from '@modules/clients/services/CreateClientService';
import UpdateClientService from '@modules/clients/services/UpdateClientService';
import DeleteClientService from '@modules/clients/services/DeleteClientService';

export default class ClientsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      cnpj,
      corporate_name,
      trading_name,
      hourly_cost,
      payment_deadline,
    } = req.body;

    const createClient = container.resolve(CreateClientService);

    const client = await createClient.execute({
      cnpj,
      corporate_name,
      trading_name,
      hourly_cost,
      payment_deadline,
    });

    return res.json(client);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const {
      cnpj,
      corporate_name,
      trading_name,
      hourly_cost,
      payment_deadline,
    } = req.body;

    const { client_id } = req.params;

    const updatedClient = container.resolve(UpdateClientService);

    const client = await updatedClient.execute({
      client_id,
      cnpj,
      corporate_name,
      trading_name,
      hourly_cost,
      payment_deadline,
    });

    return res.json(client);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { client_id } = req.params;

    const deletedClient = container.resolve(DeleteClientService);

    await deletedClient.execute({
      client_id,
    });

    return res.json();
  }
}
