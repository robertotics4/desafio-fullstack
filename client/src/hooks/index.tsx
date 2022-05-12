import { AuthProvider } from './auth';
import { PresentationsProvider } from './presentations';
import { ReservationsProvider } from './reservations';

interface Props {
  children: React.ReactNode;
}

function AppProvider({ children }: Props) {
  return (
    <AuthProvider>
      <ReservationsProvider>
        <PresentationsProvider>{children}</PresentationsProvider>
      </ReservationsProvider>
    </AuthProvider>
  );
}

export { AppProvider };
