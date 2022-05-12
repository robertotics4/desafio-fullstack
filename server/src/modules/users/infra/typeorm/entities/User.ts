import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Reservation } from '../../../../reservations/infra/typeorm/entities/Reservation';

@Entity('users')
class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  is_admin: boolean;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;

  @OneToMany(() => Reservation, reservation => reservation.user, {
    eager: true,
  })
  reservations: Reservation[];

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }

    this.is_admin = false;
  }
}

export { User };
