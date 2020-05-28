import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';

export default interface IAppointmentsRepository {
  findAllAppointments(): Promise<Appointment[] | null>;
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  save(appointment: Appointment): Promise<Appointment>;
}
