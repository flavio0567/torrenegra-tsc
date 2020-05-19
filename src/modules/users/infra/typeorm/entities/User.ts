import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  position: string;

  @Column()
  hourly_cost: number;

  @Column()
  email: string;

  @Column()
  password_hash: string;

  @Column()
  is_admin: number;

  @Column()
  is_active: number;

  @OneToMany(() => Appointment, appointment => appointment.provider)
  appointments: Appointment[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default User;
