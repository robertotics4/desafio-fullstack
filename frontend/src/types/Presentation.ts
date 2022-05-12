import PresentationSeat from './PresentationSeat';
import Reservation from './Reservation';

interface Presentation {
  id: string;
  name: string;
  description: string;
  date: string;
  imageUrl?: string;
  presentationSeats: PresentationSeat[];
  reservations: Reservation[];
}

export default Presentation;
