import { uuid } from 'uuidv4';
import { isEqual } from 'date-fns';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

class FakeAppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async findAllAppointments(): Promise<Appointment[]> {
    const { appointments } = this;

    return appointments;
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(appointment =>
      isEqual(appointment.expense_date, date)
    );

    return findAppointment;
  }

  public async create({
    project_id,
    provider_id,
    expense_amount,
    expense_date,
    expense_description,
    expense_is_holiday,
    expense_is_refundable,
    end_date,
    start_date,
    type,
    hourly_value,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, {
      id: uuid(),
      project_id,
      provider_id,
      expense_amount,
      expense_date,
      expense_description,
      expense_is_holiday,
      expense_is_refundable,
      end_date,
      start_date,
      type,
      hourly_value,
    });

    this.appointments.push(appointment);

    return appointment;
  }
}

export default FakeAppointmentsRepository;
