export default interface ICreateAppointmentDTO {
  provider_id: string;
  project_id: string;
  type: string;
  expense_amount: number;
  expense_date: Date | null;
  expense_description: string;
  expense_is_refundable: number;
  expense_is_holiday: number;
  end_date: Date | null;
  start_date: Date | null;
  hourly_value: number;
}
