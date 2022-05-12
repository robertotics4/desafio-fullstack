import { FormHandles } from '@unform/core';
import { useCallback, useRef } from 'react';
import { useLoading } from 'react-use-loading';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { parse } from 'date-fns';

import getValidationErrors from '../../utils/getValidationErrors';

import Button from '../Button';
import { Input } from '../Input';
import Modal from '../Modal';
import { TextArea } from '../TextArea';
import { ModalContent, RegisterForm, Title } from './styles';
import { InputMask } from '../InputMask';
import { usePresentations } from '../../hooks/presentations';

interface ModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
}

interface RegisterPresentationFormData {
  name: string;
  description: string;
  date: string;
  hour: string;
  imageUrl: string;
}

function RegisterPresentationModal({ isOpen, setIsOpen }: ModalProps) {
  const formRef = useRef<FormHandles>(null);
  const [{ isLoading }, { start: startLoading, stop: stopLoading }] =
    useLoading();
  const { registerPresentation } = usePresentations();

  const handleSubmit = useCallback(
    async (data: RegisterPresentationFormData) => {
      try {
        startLoading('Cadastrando espetáculo...');

        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome é obrigatório'),
          description: Yup.string().required('Descrição é obrigatória'),
          date: Yup.string().required('Data é obrigatória'),
          hour: Yup.string().required('Data é obrigatória'),
          imageUrl: Yup.string(),
        });

        await schema.validate(data, { abortEarly: false });

        const parsedDate = parse(
          `${data.date} ${data.hour}`,
          'dd/MM/yyyy HH:mm',
          new Date(),
        );

        await registerPresentation({
          name: data.name,
          description: data.description,
          imageUrl: data.imageUrl || undefined,
          date: parsedDate,
        });

        Swal.fire('Sucesso!', 'Espetáculo cadastrado com sucesso!', 'success');

        setIsOpen();
      } catch (err: any) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        Swal.fire(
          'Falha no cadastro',
          'Verifique as informações do espetáculo',
          'error',
        );
      } finally {
        stopLoading();
      }
    },
    [startLoading, stopLoading, registerPresentation, setIsOpen],
  );

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
        <Title>Cadastro de Espetáculo</Title>

        <RegisterForm ref={formRef} onSubmit={handleSubmit}>
          <Input name="name" placeholder="Nome do espetáculo" />

          <TextArea name="description" placeholder="Descrição" />

          <InputMask
            name="date"
            placeholder="Data do espetáculo"
            mask="99/99/9999"
          />

          <InputMask
            name="hour"
            placeholder="Horário do espetáculo"
            mask="99:99"
          />

          <Input name="imageUrl" type="url" placeholder="URL da imagem" />

          <Button loading={isLoading} type="submit">
            Cadastrar Espetáculo
          </Button>
        </RegisterForm>
      </ModalContent>
    </Modal>
  );
}

export { RegisterPresentationModal };
