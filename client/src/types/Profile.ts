import Reservation from './Reservation';

interface Profile {
  id: string;
  is_admin: true;
  name: string;
  reservations: Reservation[];
}

export default Profile;
