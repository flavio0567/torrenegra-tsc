import { container } from 'tsyringe';
import { Request, Response } from 'express';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

export default class AppointmentController {
  public async create(req: Request, res: Response): Promise<Response> {
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

    const createAppointment = container.resolve(CreateAppointmentService);

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
  }
}
