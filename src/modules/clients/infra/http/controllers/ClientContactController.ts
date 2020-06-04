import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateClientContactService from '@modules/clients/services/CreateClientContactService';
import UpdateClientContactService from '@modules/clients/services/UpdateClientContactService';
import DeleteClientContactService from '@modules/clients/services/DeleteClientContactService';

export default class ClientContactController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, phone, other, main_contact } = req.body;

    const { client_id } = req.params;

    const createClientContact = container.resolve(CreateClientContactService);

    const clientContact = await createClientContact.execute({
      client_id,
      name,
      email,
      phone,
      other,
      main_contact,
    });

    return res.json(clientContact);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { name, email, phone, other, main_contact } = req.body;

    const { id } = req.params;

    const updatedClientContact = container.resolve(UpdateClientContactService);

    const clientContact = await updatedClientContact.execute({
      id,
      name,
      email,
      phone,
      other,
      main_contact,
    });

    return res.json(clientContact);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deletedClient = container.resolve(DeleteClientContactService);

    await deletedClient.execute({
      id,
    });

    return res.json();
  }
}
