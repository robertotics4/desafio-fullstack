import React, { createContext, useCallback, useContext, useState } from 'react';
import { format } from 'date-fns';

import { api } from '../services/api';
import Presentation from '../types/Presentation';
import PresentationSeat from '../types/PresentationSeat';
import Finance from '../types/Finance';

interface PresentationsContextData {
  presentations: Presentation[];
  setPresentations(presentations: Presentation[]): void;
  loadPresentations(): Promise<void>;
  registerPresentation({
    name,
    description,
    date,
    imageUrl,
  }: PresentationRequest): Promise<Presentation>;
  getSeatsAvailable({
    presentationId,
    availability,
  }: GetSeatsAvailableProps): Promise<PresentationSeat[]>;
  removePresentation(presentationId: string): Promise<void>;
  showFinances(presentationId: string): Promise<Finance>;
}

interface PresentationsProviderProps {
  children?: React.ReactNode;
}

interface PresentationRequest {
  name: string;
  description: string;
  date: Date;
  imageUrl?: string;
}

interface GetSeatsAvailableProps {
  presentationId: string;
  availability: boolean;
}

const PresentationsContext = createContext<PresentationsContextData>(
  {} as PresentationsContextData,
);

function PresentationsProvider({ children }: PresentationsProviderProps) {
  const [presentations, setPresentations] = useState<Presentation[]>(() => {
    const storagedPresentations = localStorage.getItem('@PULSE:presentations');

    if (storagedPresentations) {
      return JSON.parse(storagedPresentations);
    }

    return [] as Presentation[];
  });

  const loadPresentations = useCallback(async () => {
    const response = await api.get<Presentation[]>('/presentations');

    const responsePresentations = response.data;

    localStorage.setItem(
      '@PULSE:presentations',
      JSON.stringify(responsePresentations),
    );

    setPresentations(responsePresentations);
  }, []);

  const registerPresentation = useCallback(
    async ({
      name,
      description,
      date,
      imageUrl,
    }: PresentationRequest): Promise<Presentation> => {
      const formattedDate = format(date, 'yyyy/MM/dd HH:mm');

      const response = await api.post('/presentations', {
        name,
        description,
        date: formattedDate,
        imageUrl,
      });

      return response.data;
    },
    [],
  );

  const getSeatsAvailable = useCallback(
    async ({
      presentationId,
      availability,
    }: GetSeatsAvailableProps): Promise<PresentationSeat[]> => {
      const response = await api.get<PresentationSeat[]>(
        '/presentations/availability',
        {
          params: {
            presentationId,
            availability,
          },
        },
      );

      return response.data;
    },
    [],
  );

  const removePresentation = useCallback(async (presentationId: string) => {
    await api.delete(`/presentations/${presentationId}`);
  }, []);

  const showFinances = useCallback(
    async (presentationId: string): Promise<Finance> => {
      const response = await api.get<Finance>(
        `/presentations/finances/${presentationId}`,
      );

      return response.data;
    },
    [],
  );

  return (
    <PresentationsContext.Provider
      value={{
        presentations,
        setPresentations,
        loadPresentations,
        registerPresentation,
        getSeatsAvailable,
        removePresentation,
        showFinances,
      }}
    >
      {children}
    </PresentationsContext.Provider>
  );
}

function usePresentations(): PresentationsContextData {
  const context = useContext(PresentationsContext);

  return context;
}

export { PresentationsProvider, usePresentations };
