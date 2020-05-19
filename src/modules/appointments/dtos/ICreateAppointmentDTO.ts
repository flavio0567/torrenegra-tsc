export default interface ICreateAppointmentDTO {
  provider_id: string;
  project_id: string;
  expense_amount: number;
  expense_date: Date;
  expense_description: string;
  expense_is_holiday: boolean;
  expense_is_refundable: boolean;
  end_date: Date;
  start_date: Date;
  type: string;
  hourly_value: number;
}
