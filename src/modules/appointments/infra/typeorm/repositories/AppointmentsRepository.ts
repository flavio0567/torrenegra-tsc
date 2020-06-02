import { getRepository, Repository } from 'typeorm';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

import Appointment from '../entities/Appointment';

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async findAllAppointments(): Promise<Appointment[] | undefined> {
    const appointments = await this.ormRepository.find({
      relations: ['provider'],
    });

    return appointments || undefined;
  }

  public async findById(id: string): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne(id);

    return findAppointment;
  }

  public async create({
    provider_id,
    project_id,
    type,
    expense_amount,
    expense_date,
    expense_description,
    expense_is_holiday,
    expense_is_refundable,
    end_date,
    start_date,
    hourly_value,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({
      provider_id,
      project_id,
      type,
      expense_amount,
      expense_date,
      expense_description,
      expense_is_holiday,
      expense_is_refundable,
      end_date,
      start_date,
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
