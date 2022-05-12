import Presentation from '../../types/Presentation';
import Modal from '../Modal';
import {
  ModalContent,
  PresentationImage,
  PresentationName,
  PresentationDescription,
} from './styles';

interface ModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  presentation: Presentation;
}

function ShowPresentationModal({
  isOpen,
  setIsOpen,
  presentation,
}: ModalProps) {
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
        <PresentationImage
          src={
            presentation.imageUrl ||
            'https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png?w=640'
          }
          alt={presentation.name}
        />
        <PresentationName>{presentation.name}</PresentationName>
        <PresentationDescription>
          {presentation.description}
        </PresentationDescription>
      </ModalContent>
    </Modal>
  );
}

export { ShowPresentationModal };
