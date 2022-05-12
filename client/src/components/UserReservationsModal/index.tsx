import Profile from '../../types/Profile';
import Modal from '../Modal';
import { ModalContent, Type, Username } from './styles';

interface ModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  profile: Profile;
}

function UserReservationsModal({ isOpen, setIsOpen, profile }: ModalProps) {
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
        <Username>{`Nome: ${profile.name}`}</Username>
        <Type>{`Tipo: ${profile.is_admin ? 'Administrador' : 'Padrão'}`}</Type>
      </ModalContent>
    </Modal>
  );
}

export { UserReservationsModal };
