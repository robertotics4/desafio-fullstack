import React, { createContext, useCallback, useContext, useState } from 'react';

import { api } from '../services/api';
import Reservation from '../types/Reservation';

interface ReservationsContextData {
  reservations: Reservation[];
  setReservations(reservations: Reservation[]): void;
  loadReservations(presentationId: string): Promise<void>;
  registerReservation({
    presentationId,
    presentationSeatId,
  }: ReservationRequest): Promise<Reservation>;
}

interface ReservationsProviderProps {
  children?: React.ReactNode;
}

interface ReservationRequest {
  presentationId: string;
  presentationSeatId: string;
}

const ReservationsContext = createContext<ReservationsContextData>(
  {} as ReservationsContextData,
);

function ReservationsProvider({ children }: ReservationsProviderProps) {
  const [reservations, setReservations] = useState<Reservation[]>(() => {
    const storagedReservations = localStorage.getItem('@PULSE:reservations');

    if (storagedReservations) {
      return JSON.parse(storagedReservations);
    }

    return [] as Reservation[];
  });

  const loadReservations = useCallback(async (presentationId: string) => {
    const response = await api.get<Reservation[]>('/reservations', {
      params: {
        presentationId,
      },
    });

    const responseReservations = response.data;

    localStorage.setItem(
      '@PULSE:reservations',
      JSON.stringify(responseReservations),
    );

    setReservations(responseReservations);
  }, []);

  const registerReservation = useCallback(
    async ({
      presentationId,
      presentationSeatId,
    }: ReservationRequest): Promise<Reservation> => {
      const response = await api.post<Reservation>('/reservations', {
        presentationId,
        presentationSeatId,
      });

      return response.data;
    },
    [],
  );

  return (
    <ReservationsContext.Provider
      value={{
        reservations,
        loadReservations,
        registerReservation,
        setReservations,
      }}
    >
      {children}
    </ReservationsContext.Provider>
  );
}

function useReservations(): ReservationsContextData {
  const context = useContext(ReservationsContext);

  return context;
}

export { ReservationsProvider, useReservations };
