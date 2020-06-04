import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ClientContactsRepository from '@modules/clients/infra/typeorm/repositories/ClientContactsRepository';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import ClientContactsController from '../controllers/ClientContactController';

const clientContactsRouter = Router();
const clientContactsController = new ClientContactsController();

clientContactsRouter.use(ensureAuthenticated);

clientContactsRouter.get('/', async (req, res) => {
  const clientContactsRepository = new ClientContactsRepository();
  const clientContacts = await clientContactsRepository.findAllClientContacts();

  return res.json(clientContacts);
});

clientContactsRouter.get('/:id', async (req, res) => {
  const { id } = req.params;

  const clientContactsRepository = new ClientContactsRepository();
  const clientContact = await clientContactsRepository.findById(id);

  return res.json(clientContact);
});

clientContactsRouter.post(
  '/:client_id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email(),
      phone: Joi.number(),
      main_contact: Joi.number(),
    },
    [Segments.PARAMS]: { client_id: Joi.string().required() },
  }),
  clientContactsController.create
);

clientContactsRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email(),
      phone: Joi.number(),
    },
    [Segments.PARAMS]: { id: Joi.string().required() },
  }),
  clientContactsController.update
);

clientContactsRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      [Segments.PARAMS]: { id: Joi.string().required() },
    },
  }),
  clientContactsController.delete
);

export default clientContactsRouter;
