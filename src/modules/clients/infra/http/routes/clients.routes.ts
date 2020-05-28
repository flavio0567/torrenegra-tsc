import { Router } from 'express';

import ClientsRepository from '@modules/clients/infra/typeorm/repositories/ClientsRepository';
import ensureAuthenticated from '@modules/users/infra/http/middleware/ensureAuthenticated';

import ClientsController from '../controllers/ClientsController';

const clientsRouter = Router();
const clientsController = new ClientsController();

clientsRouter.use(ensureAuthenticated);

clientsRouter.get('/', async (req, res) => {
  const clientsRepository = new ClientsRepository();
  const clients = await clientsRepository.findAllClients();

  return res.json(clients);
});

clientsRouter.get('/:client_id', async (req, res) => {
  const { id } = req.params;

  const clientsRepository = new ClientsRepository();
  const client = await clientsRepository.findById(id);

  return res.json(client);
});

clientsRouter.post('/', clientsController.create);

clientsRouter.put('/:client_id', clientsController.update);

clientsRouter.delete('/:client_id', clientsController.delete);

export default clientsRouter;
