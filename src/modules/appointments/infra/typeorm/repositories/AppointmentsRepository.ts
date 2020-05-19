import { getRepository, Repository } from 'typeorm';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

import Appointment from '../entities/Appointment';

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date },
    });

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
    const appointment = this.ormRepository.create({
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

    await this.ormRepository.save(appointment);

    return appointment;
  }

  public async save(appointment: Appointment): Promise<Appointment> {
    return this.ormRepository.save(appointment);
  }
}

export default AppointmentsRepository;
