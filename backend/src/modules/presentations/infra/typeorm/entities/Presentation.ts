import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { Reservation } from '../../../../reservations/infra/typeorm/entities/Reservation';
import { PresentationSeat } from './PresentationSeat';

@Entity('presentations')
class Presentation {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  date: Date;

  @Column()
  imageUrl?: string;

  @OneToMany(
    () => PresentationSeat,
    presentationSeats => presentationSeats.presentation,
    { eager: true, onDelete: 'CASCADE' },
  )
  presentationSeats: PresentationSeat[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Reservation, reservation => reservation.presentation, {
    eager: true,
  })
  reservations: Reservation[];

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}

export { Presentation };
