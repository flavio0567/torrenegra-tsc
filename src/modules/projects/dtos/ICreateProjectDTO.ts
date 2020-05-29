export default interface ICreateProjectDTO {
  client_id: string;
  code: string;
  description: string;
  hour_plc: number;
  hour_ihm: number;
  is_blocked: number;
  order_code: string;
  order_value: number;
  status: number;
  value_third_party: number;
  value_material: number;
  value_travel: number;
}
