import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ClientAddressesRepository from '@modules/clients/infra/typeorm/repositories/ClientAddressesRepository';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import ClientAddressesController from '../controllers/ClientAddressControler';

const clientAddressesRouter = Router();
const clientAddressesController = new ClientAddressesController();

clientAddressesRouter.use(ensureAuthenticated);

clientAddressesRouter.get('/:id', async (req, res) => {
  const { id } = req.params;

  const clientAddressesRepository = new ClientAddressesRepository();
  const clientAddress = await clientAddressesRepository.findById(id);

  return res.json(clientAddress);
});

clientAddressesRouter.post(
  '/:client_id',
  celebrate({
    [Segments.BODY]: {
      street_1: Joi.string().required(),
      street_2: Joi.string(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      zip_code: Joi.number().required(),
    },
    [Segments.PARAMS]: { client_id: Joi.string().required() },
  }),
  clientAddressesController.create
);

clientAddressesRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      street_1: Joi.string().required(),
      street_2: Joi.string(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      zip_code: Joi.number().required(),
    },
    [Segments.PARAMS]: { id: Joi.string().required() },
  }),
  clientAddressesController.update
);

clientAddressesRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      [Segments.PARAMS]: { id: Joi.string().required() },
    },
  }),
  clientAddressesController.delete
);

export default clientAddressesRouter;
