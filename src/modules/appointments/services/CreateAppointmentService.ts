import { injectable, inject } from 'tsyringe';

import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  project_id: string;
  expense_amount: number;
  expense_date: Date;
  expense_description: string;
  expense_is_holiday: number;
  expense_is_refundable: number;
  end_date: Date | null;
  start_date: Date | null;
  type: string;
  hourly_value: number;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentRepository')
    private appointmentsRepository: IAppointmentsRepository
  ) {}

  public async execute({
    project_id,
    provider_id,
    expense_amount,
    expense_description,
    expense_date,
    expense_is_holiday,
    expense_is_refundable,
    end_date,
    start_date,
    type,
    hourly_value,
  }: IRequest): Promise<Appointment> {
    const appointment = this.appointmentsRepository.create({
      project_id,
      provider_id,
      expense_amount,
      expense_description,
      expense_date,
      expense_is_holiday,
      expense_is_refundable,
      end_date,
      start_date,
      type,
      hourly_value,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
