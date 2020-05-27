import { injectable, inject } from 'tsyringe';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

import Appointment from '../infra/typeorm/entities/Appointment';

@injectable()
class ListAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository
  ) {}

  public async execute(): Promise<Appointment[] | null> {
    const appointments = await this.appointmentsRepository.findAllAppointments();

    return appointments || null;
  }
}

export default ListAppointmentsService;
