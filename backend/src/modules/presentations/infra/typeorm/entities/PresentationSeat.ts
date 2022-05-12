import { Entity, Column, ManyToOne, PrimaryColumn, OneToOne } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { Reservation } from '../../../../reservations/infra/typeorm/entities/Reservation';
import { Seat } from '../../../../seats/infra/typeorm/entities/Seat';
import { Presentation } from './Presentation';

@Entity('presentation_seats')
class PresentationSeat {
  @PrimaryColumn()
  id: string;

  @Column()
  public presentationId: string;

  @Column()
  public seatId: string;

  @Column()
  price: number;

  @Column()
  available: boolean;

  @ManyToOne(
    () => Presentation,
    presentation => presentation.presentationSeats,
    { onDelete: 'CASCADE' },
  )
  public presentation: Presentation;

  @ManyToOne(() => Seat, seat => seat.presentationSeats, { eager: true })
  public seat: Seat;

  @OneToOne(() => Reservation)
  reservation: Reservation;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}

export { PresentationSeat };
