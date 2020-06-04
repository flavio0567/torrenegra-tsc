import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', async (req, res) => {
  const appointmentsRepository = new AppointmentsRepository();
  const appointments = await appointmentsRepository.findAllAppointments();

  return res.json(appointments);
});

appointmentsRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const appointmentsRepository = new AppointmentsRepository();
  const appointments = await appointmentsRepository.findById(id);

  return res.json(appointments);
});

appointmentsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      provider_id: Joi.string().uuid().required(),
      project_id: Joi.string().uuid().required(),
      type: Joi.string().required(),
      expense_amount: Joi.number(),
      expense_date: Joi.date(),
      expense_description: Joi.string(),
      expense_is_holiday: Joi.number().default(0),
      expense_is_refundable: Joi.number().default(0),
      end_date: Joi.date(),
      start_date: Joi.date(),
      hourly_value: Joi.number(),
    }),
  }),
  appointmentsController.create
);

appointmentsRouter.put('/close/:id', (req, res) =>
  res.json({ message: 'close appointment' })
);

export default appointmentsRouter;
