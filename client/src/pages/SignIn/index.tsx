import { FormHandles } from '@unform/core';
import { useCallback, useRef } from 'react';
import { useLoading } from 'react-use-loading';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import Swal from 'sweetalert2';

import { Container, TitleContainer, FormContainer, SignInForm } from './styles';
import logo from '../../assets/logo.svg';
import { Input } from '../../components/Input';
import Button from '../../components/Button';
import { useAuth } from '../../hooks/auth';
import getValidationErrors from '../../utils/getValidationErrors';
import Loading from '../../components/Loading';

interface SignInFormData {
  email: string;
  password: string;
}

function SignIn() {
  const formRef = useRef<FormHandles>(null);
  const [{ isLoading, message }, { start: startLoading, stop: stopLoading }] =
    useLoading();
  const { signIn } = useAuth();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        startLoading('Efetuando login...');

        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail é obrigatório')
            .matches(
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              'E-mail inválido',
            ),
          password: Yup.string().required('Senha é obrigatória'),
        });

        await schema.validate(data, { abortEarly: false });

        await signIn({
          email: data.email,
          password: data.password,
        });

        history.push('/main');
      } catch (err: any) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        Swal.fire(
          'Falha na autenticação',
          'Verifique suas credenciais',
          'error',
        );
      } finally {
        stopLoading();
      }
    },
    [signIn, startLoading, stopLoading, history],
  );

  return (
    <Container>
      <TitleContainer>
        <img src={logo} alt="Logomarca da PULSE" />

        <h1>Faça seu login na plataforma</h1>
      </TitleContainer>

      <FormContainer>
        <SignInForm ref={formRef} onSubmit={handleSubmit} autoComplete="off">
          <Input name="email" placeholder="E-mail" />

          <Input name="password" type="password" placeholder="Senha" />

          <Button type="submit">Entrar</Button>
        </SignInForm>
      </FormContainer>

      {isLoading && (
        <Loading isOpen={isLoading} message={message} setIsOpen={stopLoading} />
      )}
    </Container>
  );
}

export { SignIn };
