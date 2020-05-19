import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import Project from '@modules/projects/infra/typeorm/entities/Project';
import Address from './Address';
import Contact from './Contact';

@Entity('clients')
class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  corporate_name: string;

  @Column()
  trading_name: string;

  @Column()
  hourly_cost: number;

  @Column()
  deadline_payment: number;

  @OneToMany(() => Address, address => address.client)
  addresses: Address[];

  @OneToMany(() => Contact, contact => contact.client)
  contacts: Contact[];

  @OneToMany(() => Project, project => project.client)
  projects: Project[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Client;
