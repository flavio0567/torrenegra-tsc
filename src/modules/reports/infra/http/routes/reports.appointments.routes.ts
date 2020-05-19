import { Router } from 'express';

const reportAppointmentsRouter = Router();

/* ApptTimeUser report    */
reportAppointmentsRouter.get('/time/user/:id', (req, res) =>
  res.json({ message: 'ApptTimeUser report' })
);

/* ApptTimeUser report    */
reportAppointmentsRouter.get('/list/time/user/:id', (req, res) =>
  res.json({ message: 'ApptTimeUser report 2' })
);

/* ApptExpense report/List Appt    */
reportAppointmentsRouter.get('/expense/', (req, res) =>
  res.json({ message: 'ApptExpense report/List Appt' })
);

/* Financial report  */
reportAppointmentsRouter.get('/total/:id', (req, res) =>
  res.json({ message: 'Financial report' })
);

export default reportAppointmentsRouter;
