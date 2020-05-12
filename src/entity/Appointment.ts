import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import User from './User';
import Project from './Project';

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'provider_id' })
  provider: User;

  @Column()
  project_id: string;

  @ManyToOne(() => Project)
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @Column()
  expense_amount: number;

  @Column()
  expense_date: Date;

  @Column()
  expense_description: string;

  @Column()
  expense_is_refundable: boolean;

  @Column()
  end_date: Date;

  @Column()
  expense_is_holiday: boolean;

  @Column()
  start_date: Date;

  @Column()
  type: string;

  @Column()
  hourly_value: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Appointment;
