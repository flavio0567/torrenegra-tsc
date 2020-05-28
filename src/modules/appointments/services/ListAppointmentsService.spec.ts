import FakeAppointmentsRepositoty from '../repositories/fakes/FakeAppointmentsRepositoty';
import ListAppointmentsService from './ListAppointmentsService';

let fakeAppointmentsRepository: FakeAppointmentsRepositoty;
let listAappointments: ListAppointmentsService;

describe('ListAppointments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepositoty();

    listAappointments = new ListAppointmentsService(fakeAppointmentsRepository);
  });

  it('should be able to list all appointments available', async () => {
    const appointment1 = await fakeAppointmentsRepository.create({
      project_id: '123456',
      provider_id: '123456',
      expense_amount: 1200.0,
      expense_description: 'alimentacao',
      expense_date: new Date(),
      expense_is_holiday: 1,
      expense_is_refundable: 1,
      end_date: null,
      start_date: null,
      type: 'expense',
      hourly_value: 145.0,
    });

    const appointment2 = await fakeAppointmentsRepository.create({
      project_id: '888888',
      provider_id: '99999',
      expense_amount: 0,
      expense_description: '',
      expense_date: null,
      expense_is_holiday: 0,
      expense_is_refundable: 0,
      end_date: null,
      start_date: new Date(),
      type: 'time',
      hourly_value: 145.0,
    });

    const appointments = await listAappointments.execute();

    expect(appointments).toEqual([appointment1, appointment2]);
  });
});
