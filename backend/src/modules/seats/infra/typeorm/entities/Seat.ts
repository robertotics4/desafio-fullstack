import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { PresentationSeat } from '../../../../presentations/infra/typeorm/entities/PresentationSeat';

@Entity('seats')
class Seat {
  @PrimaryColumn()
  id: string;

  @Column()
  row: string;

  @Column()
  num: number;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(
    () => PresentationSeat,
    presentationSeats => presentationSeats.seat,
  )
  presentationSeats: PresentationSeat[];

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}

export { Seat };
