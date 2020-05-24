import 'reflect-metadata';

import CreateAppointmentService from './CreateAppointmentService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepositoty';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateApointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository
    );
  });

  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointment.execute({
      project_id: '123456',
      provider_id: '123456',
      expense_amount: 1200.0,
      expense_description: 'alimentacao',
      expense_date: new Date(),
      expense_is_holiday: 0,
      expense_is_refundable: 0,
      end_date: null,
      start_date: null,
      type: 'time',
      hourly_value: 145.0,
    });

    expect(appointment).toHaveProperty('id');
  });
});
