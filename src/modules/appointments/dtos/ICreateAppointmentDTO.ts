export default interface ICreateAppointmentDTO {
  provider_id: string;
  project_id: string;
  type: string;
  expense_amount: number | null;
  expense_date: Date | null;
  expense_description: string | null;
  expense_is_holiday: number | null;
  expense_is_refundable: number | null;
  end_date: Date | null;
  start_date: Date | null;
  hourly_value: number | null;
}
