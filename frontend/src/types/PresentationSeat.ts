import Seat from './Seat';

interface PresentationSeat {
  id: string;
  presentationId: string;
  seatId: string;
  price: number;
  available: boolean;
  seat: Seat;
}

export default PresentationSeat;
