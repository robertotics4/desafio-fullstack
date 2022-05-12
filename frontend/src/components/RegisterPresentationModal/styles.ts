import { Form } from '@unform/web';
import styled from 'styled-components';

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 0px 24px;
`;

export const Title = styled.h1`
  text-align: center;
  color: var(--titles);
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 42px;
`;

export const RegisterForm = styled(Form)`
  margin-top: 24px;
  width: 100%;
  text-align: left;
`;
