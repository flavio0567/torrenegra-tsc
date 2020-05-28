import { uuid } from 'uuidv4';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

class FakeAppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async findAllAppointments(): Promise<Appointment[]> {
    const { appointments } = this;

    return appointments;
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

  public async save(appointment: Appointment): Promise<Appointment> {
    const findIndex = this.appointments.findIndex(
      saveAppointment => saveAppointment.id === appointment.id
    );

    this.appointments[findIndex] = appointment;

    return appointment;
  }
}

export default FakeAppointmentsRepository;
