import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Client from './Client';

@Entity('contacts')
class Contact {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  client_id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ type: 'bigint' })
  phone: number;

  @Column()
  other: string;

  @Column()
  main_contact: number;

  @ManyToOne(() => Client, client => client.contacts)
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Contact;
