export default interface ICreateAppointmentDTO {
  provider_id: string;
  project_id: string;
  expense_amount: number;
  expense_date: Date;
  expense_description: string;
  expense_is_holiday: number;
  expense_is_refundable: number;
  end_date: Date | null;
  start_date: Date | null;
  type: string;
  hourly_value: number;
}
