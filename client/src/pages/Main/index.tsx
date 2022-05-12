import {
  FiPower,
  FiEye,
  FiTrash,
  FiEdit,
  FiDollarSign,
  FiPlus,
  FiUserCheck,
  FiLock,
} from 'react-icons/fi';
import { useCallback, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useLoading } from 'react-use-loading';
import {
  Container,
  Header,
  Title,
  UserInfo,
  UserEmail,
  LogoutButton,
  LogoutButtonText,
  PresentationsList,
  PresentationItem,
  PresentationInfo,
  ActionsMenu,
  Action,
  Box,
  RegisterPresentationButton,
  ProfileButton,
} from './styles';

import logo from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';
import { usePresentations } from '../../hooks/presentations';
import Presentation from '../../types/Presentation';
import { RegisterPresentationModal } from '../../components/RegisterPresentationModal';
import { ShowPresentationModal } from '../../components/ShowPresentationModal';
import { RegisterReservationModal } from '../../components/RegisterReservationModal';
import { useReservations } from '../../hooks/reservations';
import Loading from '../../components/Loading';
import { FinanceModal } from '../../components/FinanceModal';
import { UpdatePresentationModal } from '../../components/UpdatePresentationModal';
import { UserReservationsModal } from '../../components/UserReservationsModal';
import Profile from '../../types/Profile';

function Main() {
  const { user, signOut } = useAuth();
  const { reservations, showProfileAndReservations } = useReservations();
  const { presentations, loadPresentations, removePresentation } =
    usePresentations();
  const [registrationModalOpen, setRegistrationModalOpen] = useState(false);
  const [showModalOpen, setShowModalopen] = useState(false);
  const [financeModalOpen, setFinanceModalOpen] = useState(false);
  const [reservationModalOpen, setReservationModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [userReservationsModal, setUserReservationsModal] = useState(false);
  const [selectedPresentation, setSelectedPresentation] =
    useState<Presentation>({} as Presentation);
  const [userProfile, setUserProfile] = useState<Profile>({} as Profile);
  const [{ isLoading, message }, { start: startLoading, stop: stopLoading }] =
    useLoading();

  useEffect(() => {}, [presentations, reservations, loadPresentations]);

  const toggleRegistrationModalOpen = useCallback(() => {
    setRegistrationModalOpen(!registrationModalOpen);
  }, [registrationModalOpen]);

  const toggleShowModalOpen = useCallback(
    (presentation: Presentation) => {
      setSelectedPresentation(presentation);
      setShowModalopen(!showModalOpen);
    },
    [showModalOpen],
  );

  const toggleReservationModalOpen = useCallback(
    (presentation: Presentation) => {
      setSelectedPresentation(presentation);
      setReservationModalOpen(!reservationModalOpen);
    },
    [reservationModalOpen],
  );

  const toggleFinanceModalOpen = useCallback(
    (presentation: Presentation) => {
      setSelectedPresentation(presentation);
      setFinanceModalOpen(!financeModalOpen);
    },
    [financeModalOpen],
  );

  const toggleUpdateModalOpen = useCallback(
    (presentation: Presentation) => {
      setSelectedPresentation(presentation);
      setUpdateModalOpen(!updateModalOpen);
    },
    [updateModalOpen],
  );

  const toggleUserReservationsModal = useCallback(() => {
    setUserReservationsModal(!userReservationsModal);
  }, [userReservationsModal]);

  const handleReservationsButton = useCallback(async () => {
    const profileAndReservations = await showProfileAndReservations();

    if (!profileAndReservations.reservations.length) {
      Swal.fire('Reservas', 'Você não possui reservas no momento', 'info');
    } else {
      setUserProfile(profileAndReservations);
      toggleUserReservationsModal();
    }
  }, [showProfileAndReservations, toggleUserReservationsModal]);

  const handleRemovePresentation = useCallback(
    (presentationId: string) => {
      Swal.fire({
        title: 'Deseja excluir o espetáculo?',
        showDenyButton: true,
        denyButtonColor: '#33cc95',
        showCancelButton: true,
        confirmButtonText: 'Sim',
        confirmButtonColor: '#e52e4d',
        denyButtonText: `Não`,
      }).then(async result => {
        if (result.isConfirmed) {
          startLoading('Removendo espetáculo...');
          await removePresentation(presentationId);
          await loadPresentations();
          stopLoading();
          Swal.fire('Excluído com sucesso!', '', 'success');
        } else if (result.isDenied) {
          Swal.fire('Exclusão cancelada', '', 'info');
        }
      });
    },
    [removePresentation, startLoading, stopLoading],
  );

  useEffect(() => {
    async function load() {
      await loadPresentations();
    }

    load();
  }, [loadPresentations]);

  return (
    <Container>
      <Box>
        <Header>
          <Title>
            <img src={logo} alt="Logomarca da pulse" />
            <UserEmail>{user.email}</UserEmail>
            <ProfileButton onClick={handleReservationsButton}>
              Profile
            </ProfileButton>
          </Title>

          <UserInfo>
            <LogoutButton onClick={signOut}>
              <LogoutButtonText>Sair</LogoutButtonText>
              <FiPower />
            </LogoutButton>
          </UserInfo>
        </Header>

        <PresentationsList>
          {presentations.map((presentation: Presentation) => (
            <PresentationItem key={presentation.id}>
              <PresentationInfo>
                <h2>{presentation.name}</h2>
                <span>
                  {new Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC' }).format(
                    new Date(presentation.date),
                  )}
                </span>
              </PresentationInfo>

              <ActionsMenu>
                {user.isAdmin && (
                  <Action onClick={() => toggleFinanceModalOpen(presentation)}>
                    <FiDollarSign size={20} color="#33cc95" />
                  </Action>
                )}

                <Action
                  onClick={() => toggleReservationModalOpen(presentation)}
                >
                  <FiUserCheck size={20} />
                </Action>

                <Action onClick={() => toggleShowModalOpen(presentation)}>
                  <FiEye size={20} />
                </Action>

                {user.isAdmin && (
                  <Action
                    onClick={() => handleRemovePresentation(presentation.id)}
                  >
                    <FiTrash size={20} color="#e52e4d" />
                  </Action>
                )}

                {user.isAdmin && (
                  <Action onClick={() => toggleUpdateModalOpen(presentation)}>
                    <FiEdit size={20} />
                  </Action>
                )}
              </ActionsMenu>
            </PresentationItem>
          ))}
        </PresentationsList>

        {user.isAdmin && (
          <RegisterPresentationButton onClick={toggleRegistrationModalOpen}>
            <FiPlus size={20} />
            Cadastrar Espetáculo
          </RegisterPresentationButton>
        )}
      </Box>

      <RegisterPresentationModal
        isOpen={registrationModalOpen}
        setIsOpen={toggleRegistrationModalOpen}
      />

      <ShowPresentationModal
        isOpen={showModalOpen}
        setIsOpen={() => toggleShowModalOpen(selectedPresentation)}
        presentation={selectedPresentation}
      />

      <RegisterReservationModal
        isOpen={reservationModalOpen}
        setIsOpen={() => toggleReservationModalOpen(selectedPresentation)}
        presentation={selectedPresentation}
      />

      <FinanceModal
        isOpen={financeModalOpen}
        setIsOpen={() => toggleFinanceModalOpen(selectedPresentation)}
        presentation={selectedPresentation}
      />

      <UpdatePresentationModal
        isOpen={updateModalOpen}
        setIsOpen={() => toggleUpdateModalOpen(selectedPresentation)}
        presentation={selectedPresentation}
      />

      <UserReservationsModal
        isOpen={userReservationsModal}
        setIsOpen={() => toggleUserReservationsModal()}
        profile={userProfile}
      />

      {isLoading && (
        <Loading isOpen={isLoading} message={message} setIsOpen={stopLoading} />
      )}
    </Container>
  );
}

export { Main };
