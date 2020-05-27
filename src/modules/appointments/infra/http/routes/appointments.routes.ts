import { Router } from 'express';

import appointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import ensureAuthenticated from '@modules/users/infra/http/middleware/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', async (req, res) => {
  const appointments = await appointmentsRepository.prototype.findAllAppointments();

  return res.json(appointments);
});

appointmentsRouter.post('/', appointmentsController.create);

appointmentsRouter.put('/close/:id', (req, res) =>
  res.json({ message: 'close appointment' })
);

export default appointmentsRouter;
