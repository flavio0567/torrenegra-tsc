import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

import ensureAuthenticated from '../middleware/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', async (req, res) => {
  const appointmentRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentRepository.find();

  return res.json(appointments);
});

appointmentsRouter.post('/new', async (req, res) => {
  const {
    expense_amount,
    expense_date,
    expense_description,
    expense_is_holiday,
    expense_is_refundable,
    end_date,
    project_id,
    provider_id,
    start_date,
    type,
    hourly_value,
  } = req.body;

  const createAppointment = new CreateAppointmentService();

  const appointment = createAppointment.execute({
    expense_amount,
    expense_date,
    expense_description,
    expense_is_holiday,
    expense_is_refundable,
    end_date,
    project_id,
    provider_id,
    start_date,
    type,
    hourly_value,
  });

  return res.json(appointment);
});

appointmentsRouter.put('/close/:id', (req, res) =>
  res.json({ message: 'close appointment' })
);

export default appointmentsRouter;
