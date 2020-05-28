import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import IClientsRepository from '@modules/clients/repositories/IClientsRepository';
import ClientsRepository from '@modules/clients/infra/typeorm/repositories/ClientsRepository';

import IClientContactsRepository from '@modules/clients/repositories/IClientContactsRepository';
import ClientContactsRepository from '@modules/clients/infra/typeorm/repositories/ClientContactsRepository';

import IClientAddressesRepository from '@modules/clients/repositories/IClientAddressesRepository';
import ClientAddressesRepository from '@modules/clients/infra/typeorm/repositories/ClientAddressesRepository';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository
);

container.registerSingleton<IClientsRepository>(
  'ClientsRepository',
  ClientsRepository
);

container.registerSingleton<IClientContactsRepository>(
  'ClientContactsRepository',
  ClientContactsRepository
);

container.registerSingleton<IClientAddressesRepository>(
  'ClientAddressesRepository',
  ClientAddressesRepository
);

container.registerSingleton<IAppointmentsRepository>(
  'AppointmentRepository',
  AppointmentsRepository
);
