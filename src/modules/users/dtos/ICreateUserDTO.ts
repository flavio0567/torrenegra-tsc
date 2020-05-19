export default interface ICreateUserDTO {
  first_name: string;
  last_name: string;
  email: string;
  password_hash: string;
  position: string;
  hourly_cost: number;
  is_admin: number;
  is_active: number;
}
