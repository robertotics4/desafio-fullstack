import { Form } from '@unform/web';
import styled from 'styled-components';

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  max-width: 600px;
  padding: 0px 24px;
`;

export const PresentationName = styled.h2``;

export const SeatsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Seat = styled.p``;

export const ReservationForm = styled(Form)`
  margin-top: 24px;
  width: 300px;
  text-align: left;
`;

export const SeatsInfo = styled.p`
  font-size: 16px;
  margin-top: 16px;
`;

export const Value = styled.p`
  font-size: 16px;
  margin-top: 16px;
`;
