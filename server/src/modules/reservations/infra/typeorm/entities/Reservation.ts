import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { PresentationSeat } from '../../../../presentations/infra/typeorm/entities/PresentationSeat';
import { User } from '../../../../users/infra/typeorm/entities/User';
import { Presentation } from '../../../../presentations/infra/typeorm/entities/Presentation';

@Entity('reservations')
class Reservation {
  @PrimaryColumn()
  id: string;

  @Column()
  userId: string;

  @Column()
  presentationId: string;

  @Column()
  presentationSeatId: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToOne(() => Presentation)
  @JoinColumn()
  presentation: Presentation;

  @OneToOne(() => PresentationSeat, { eager: true })
  @JoinColumn()
  presentationSeat: PresentationSeat;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}

export { Reservation };
