export default interface ICreateClientContactDTO {
  client_id: string;
  name: string;
  email: string;
  phone: number;
  other: string;
  main_contact: number;
}
