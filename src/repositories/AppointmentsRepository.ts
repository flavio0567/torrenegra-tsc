import { EntityRepository, Repository } from 'typeorm';

import Appointment from '../entity/Appointment';

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
  public async findbyDate(
    type: string,
    user: string,
    endDate: Date
  ): Promise<Appointment | null> {
    const findAppointment = await this.findOne({
      where: { type, user, endDate },
    });

    return findAppointment || null;
  }
}

export default AppointmentsRepository;
