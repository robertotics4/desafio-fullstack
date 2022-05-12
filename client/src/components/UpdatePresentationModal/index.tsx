import { FormHandles } from '@unform/core';
import { useCallback, useEffect, useRef, useState } from 'react';
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
import Presentation from '../../types/Presentation';
import Loading from '../Loading';

interface ModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  presentation: Presentation;
}

interface UpdatePresentationFormData {
  id: string;
  name: string;
  description: string;
  date: string;
  hour: string;
  imageUrl?: string;
}

function UpdatePresentationModal({
  isOpen,
  setIsOpen,
  presentation,
}: ModalProps) {
  const formRef = useRef<FormHandles>(null);
  const { updatePresentation, presentations, setPresentations } =
    usePresentations();
  const [{ isLoading, message }, { start: startLoading, stop: stopLoading }] =
    useLoading();
  const [selectedPresentation, setSelectedPresentation] =
    useState<Presentation>({} as Presentation);

  useEffect(() => {
    setSelectedPresentation(presentation);
  }, [presentation, selectedPresentation]);

  const handleSubmit = useCallback(
    async (data: UpdatePresentationFormData) => {
      try {
        startLoading('Atualizando espetáculo...');

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

        const updated = await updatePresentation({
          id: data.id,
          name: data.name,
          description: data.description,
          date: parsedDate,
          imageUrl: data.imageUrl || undefined,
        });

        Swal.fire('Sucesso', 'Espetáculo alterado com sucesso!', 'success');
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
    [startLoading, stopLoading, updatePresentation, setIsOpen],
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
        <Title>Editar Espetáculo</Title>

        <RegisterForm
          ref={formRef}
          initialData={{
            id: presentation.id,
            name: presentation.name,
            description: presentation.description,
            imageUrl: presentation.imageUrl || undefined,
          }}
          onSubmit={handleSubmit}
        >
          <Input name="id" disabled />

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
            Atualizar Espetáculo
          </Button>
        </RegisterForm>
      </ModalContent>

      {isLoading && (
        <Loading isOpen={isLoading} message={message} setIsOpen={stopLoading} />
      )}
    </Modal>
  );
}

export { UpdatePresentationModal };
