import React, { createContext, useCallback, useContext, useState } from 'react';
import { format } from 'date-fns';

import { api } from '../services/api';
import Presentation from '../types/Presentation';
import PresentationSeat from '../types/PresentationSeat';
import Finance from '../types/Finance';

interface PresentationsContextData {
  presentations: Presentation[];
  finances: Finance;
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
  updatePresentation({
    id,
    name,
    description,
    date,
    imageUrl,
  }: PresentationUpdateProps): Promise<Presentation>;
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

interface PresentationUpdateProps {
  id: string;
  name: string;
  description: string;
  date: Date;
  imageUrl?: string;
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
  const [finances, setFinances] = useState<Finance>({} as Finance);

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

      setPresentations([...presentations, response.data]);

      return response.data;
    },
    [setPresentations, presentations],
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

  const removePresentation = useCallback(
    async (presentationId: string) => {
      await api.delete(`/presentations/${presentationId}`);

      const index = presentations.findIndex(
        presentation => presentation.id === presentationId,
      );

      const newArray = [...presentations].splice(index, 1);

      setPresentations(newArray);
    },
    [presentations],
  );

  const showFinances = useCallback(
    async (presentationId: string): Promise<Finance> => {
      const response = await api.get<Finance>(
        `/presentations/finances/${presentationId}`,
      );

      setFinances(response.data);

      return response.data;
    },
    [],
  );

  const updatePresentation = useCallback(
    async ({
      id,
      name,
      description,
      date,
      imageUrl,
    }: PresentationUpdateProps): Promise<Presentation> => {
      const formattedDate = format(date, 'yyyy/MM/dd HH:mm');

      const response = await api.put('/presentations', {
        id,
        name,
        description,
        date: formattedDate,
        imageUrl,
      });

      const updated = presentations.map(p => {
        if (p.id === response.data.id) {
          Object.assign(p, response.data);
        }

        return p;
      });

      setPresentations(updated);

      return response.data;
    },
    [presentations],
  );

  return (
    <PresentationsContext.Provider
      value={{
        presentations,
        finances,
        setPresentations,
        loadPresentations,
        registerPresentation,
        getSeatsAvailable,
        removePresentation,
        showFinances,
        updatePresentation,
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
