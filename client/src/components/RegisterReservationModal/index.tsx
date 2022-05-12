import { FormHandles } from '@unform/core';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useLoading } from 'react-use-loading';
import Swal from 'sweetalert2';
import * as Yup from 'yup';

import { usePresentations } from '../../hooks/presentations';
import { useReservations } from '../../hooks/reservations';
import Presentation from '../../types/Presentation';
import PresentationSeat from '../../types/PresentationSeat';
import getValidationErrors from '../../utils/getValidationErrors';
import Button from '../Button';
import Loading from '../Loading';
import Modal from '../Modal';
import { Select } from '../Select';
import {
  ModalContent,
  PresentationName,
  ReservationForm,
  SeatsInfo,
  Value,
} from './styles';

interface ModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  presentation: Presentation;
}

interface RegisterReservationFormData {
  reservedSeat: string;
}

function RegisterReservationModal({
  isOpen,
  setIsOpen,
  presentation,
}: ModalProps) {
  const { registerReservation, setReservations, reservations } =
    useReservations();
  const { getSeatsAvailable } = usePresentations();
  const [availableSeats, setAvailableSeats] = useState<PresentationSeat[]>([]);
  const [reservedSeats, setReservedSeats] = useState<PresentationSeat[]>([]);

  const formRef = useRef<FormHandles>(null);
  const [{ isLoading, message }, { start: startLoading, stop: stopLoading }] =
    useLoading();

  const findConcatenatedSeat = useCallback(
    (concatenated: string) => {
      const seatInfo = concatenated.split('');
      const row = seatInfo[0];
      const num = Number(seatInfo[1]);

      const findSeat = availableSeats.find(
        (availableSeat: PresentationSeat) => {
          if (
            availableSeat.seat.row === row &&
            availableSeat.seat.num === num
          ) {
            return availableSeat;
          }

          return {} as PresentationSeat;
        },
      );

      return findSeat;
    },
    [availableSeats],
  );

  const handleSubmit = useCallback(
    async (data: RegisterReservationFormData) => {
      try {
        startLoading('Reservando poltrona...');

        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          reservedSeat: Yup.string().required('A poltrona é obrigatória'),
        });

        await schema.validate(data, { abortEarly: false });

        const presentationSeat = findConcatenatedSeat(data.reservedSeat);

        if (presentationSeat) {
          await registerReservation({
            presentationId: presentation.id,
            presentationSeatId: presentationSeat?.id,
          });

          Swal.fire(
            'Sucesso!',
            'Sua reserva foi efetuada com sucesso!',
            'success',
          );

          setIsOpen();
        }
      } catch (err: any) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        Swal.fire('Falha na reeserva', 'Falha ao reservar poltrona', 'error');
      } finally {
        stopLoading();
      }
    },
    [
      findConcatenatedSeat,
      startLoading,
      stopLoading,
      presentation.id,
      registerReservation,
      setIsOpen,
    ],
  );

  useEffect(() => {
    async function load() {
      const reserved = await getSeatsAvailable({
        presentationId: presentation.id,
        availability: false,
      });

      const available = await getSeatsAvailable({
        presentationId: presentation.id,
        availability: true,
      });

      setAvailableSeats(available);
      setReservedSeats(reserved);
    }

    load();
  }, [presentation, getSeatsAvailable]);

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      customStyles={{
        borderRadius: '8px',
        padding: '48px 0',
        width: 'fit-content',
        height: 'fit-content',
      }}
    >
      <ModalContent>
        <PresentationName>{presentation.name}</PresentationName>
        <SeatsInfo>{`Poltronas já reservadas: ${reservedSeats.length}`}</SeatsInfo>
        <Value>Valor por poltrona: R$ 27,99</Value>

        <ReservationForm ref={formRef} onSubmit={handleSubmit}>
          <Select
            name="reservedSeat"
            placeholder="Fileira"
            label="Selecione a poltrona"
          >
            {availableSeats &&
              availableSeats.map(availableSeat => (
                <option
                  key={availableSeat.id}
                  value={`${availableSeat.seat.row}${availableSeat.seat.num}`}
                >{`${availableSeat.seat.row}${availableSeat.seat.num}`}</option>
              ))}
          </Select>

          <Button loading={isLoading} type="submit">
            Fazer Reserva
          </Button>
        </ReservationForm>
      </ModalContent>

      {isLoading && (
        <Loading isOpen={isLoading} message={message} setIsOpen={stopLoading} />
      )}
    </Modal>
  );
}

export { RegisterReservationModal };
