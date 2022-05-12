import styled from 'styled-components';
import { Form } from '@unform/web';

export const Container = styled.div`
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  width: 338px;
  height: 287px;

  img {
    height: 65px;
  }

  h1 {
    font-size: 48px;
    margin-top: 24px;

    color: var(--titles);
  }
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  min-width: 348px;
  border-radius: 10px;
  padding: 42px;
  margin-left: 48px;

  background-color: var(--white);
`;

export const SignInForm = styled(Form)`
  width: 100%;
  text-align: left;
`;
