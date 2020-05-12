import { Router } from 'express';
import sessionsRouter from './sessions.routes';
import usersRouter from './users.routes';
import appointmentsRouter from './appointments.routes';
import reportAppointmentsRouter from './reports.appointments.routes';

const routes = Router();

routes.use('/sessions', sessionsRouter);
routes.use('/users', usersRouter);
routes.use('/appointments', appointmentsRouter);
routes.use('/appointments', reportAppointmentsRouter);

export default routes;
