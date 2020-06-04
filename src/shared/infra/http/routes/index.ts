import { Router } from 'express';

import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';

import clientsRouter from '@modules/clients/infra/http/routes/clients.routes';
import clientContactsRouter from '@modules/clients/infra/http/routes/contacts.routes';
import clientAddressesRouter from '@modules/clients/infra/http/routes/addresses.routes';
import projectsRouter from '@modules/projects/infra/http/routes/projects.routes';
import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes';
import reportAppointmentsRouter from '@modules/reports/infra/http/routes/reports.appointments.routes';

const routes = Router();

routes.use('/sessions', sessionsRouter);
routes.use('/users', usersRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/clients', clientsRouter);
routes.use('/clients/contacts', clientContactsRouter);
routes.use('/clients/addresses', clientAddressesRouter);
routes.use('/projects', projectsRouter);
routes.use('/appointments', appointmentsRouter);
routes.use('/reports', reportAppointmentsRouter);

export default routes;
