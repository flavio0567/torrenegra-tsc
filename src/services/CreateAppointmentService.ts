import { getRepository } from 'typeorm';
import Appointment from '../entity/Appointment';

interface Request {
  provider_id: string;
  project_id: string;
  expense_amount: number;
  expense_date: Date;
  expense_description: string;
  expense_is_refundable: boolean;
  end_date: Date;
  expense_is_holiday: boolean;
  start_date: Date;
  type: string;
  hourly_value: number;
}

class CreateAppointmentService {
  public async execute({
    expense_amount,
    expense_description,
    expense_date,
    expense_is_holiday,
    expense_is_refundable,
    end_date,
    project_id,
    provider_id,
    start_date,
    type,
    hourly_value,
  }: Request): Promise<Appointment> {
    const appointmentsRepository = getRepository(Appointment);

    const appointment = appointmentsRepository.create({
      expense_amount,
      expense_description,
      expense_date,
      expense_is_holiday,
      expense_is_refundable,
      end_date,
      project_id,
      provider_id,
      start_date,
      type,
      hourly_value,
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
