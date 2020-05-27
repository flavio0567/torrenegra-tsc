import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import Client from '@modules/clients/infra/typeorm/entities/Client';

@Entity('projects')
class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  client_id: string;

  @ManyToOne(() => Client, client => client.projects)
  @JoinColumn({ name: 'client_id' })
  client: Client[];

  @OneToMany(() => Appointment, appointment => appointment.provider)
  appointments: Appointment[];

  @Column()
  code: string;

  @Column()
  description: string;

  @Column()
  hour_plc: number;

  @Column()
  hour_ihm: number;

  @Column()
  is_blocked: number;

  @Column()
  order_code: string;

  @Column()
  order_value: number;

  @Column()
  status: number;

  @Column()
  value_third_party: number;

  @Column()
  value_material: number;

  @Column()
  value_travel: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Project;
