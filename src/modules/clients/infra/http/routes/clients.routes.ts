import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

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

clientsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      cnpj: Joi.string().required(),
      corporate_name: Joi.string().required(),
      trading_name: Joi.string().required(),
      hourly_cost: Joi.number().required(),
      payment_deadline: Joi.number().required(),
    },
  }),
  clientsController.create
);

clientsRouter.put(
  '/:client_id',
  celebrate({
    [Segments.BODY]: {
      cnpj: Joi.string().required(),
      corporate_name: Joi.string().required(),
      trading_name: Joi.string().required(),
      hourly_cost: Joi.number().required(),
      payment_deadline: Joi.number().required(),
    },
    [Segments.PARAMS]: { client_id: Joi.string().required() },
  }),
  clientsController.update
);

clientsRouter.delete(
  '/:client_id',
  celebrate({
    [Segments.PARAMS]: {
      [Segments.PARAMS]: { client_id: Joi.string().required() },
    },
  }),
  clientsController.delete
);

export default clientsRouter;
