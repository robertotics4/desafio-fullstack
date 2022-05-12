import React from 'react';
import { FiPower, FiSettings, FiLock } from 'react-icons/fi';

import {
  Container,
  Logo,
  WelcomeText,
  Username,
  UserMenu,
  LogoutButton,
  LogoutButtonText,
  OptionsMenu,
  Option,
} from './styles';

import logoWhite from '../../assets/logo-white.svg';

import { useAuth } from '../../hooks/auth';

const LeftBar: React.FC = () => {
  const { user, signOut } = useAuth();

  return (
    <Container>
      <UserMenu>
        <Logo src={logoWhite} alt="Logomarca da Pulse" />

        <WelcomeText>
          Bem vindo,
          <Username>{user.email}</Username>
        </WelcomeText>

        <LogoutButton onClick={signOut}>
          <FiPower />
          <LogoutButtonText>Sair</LogoutButtonText>
        </LogoutButton>
      </UserMenu>

      <OptionsMenu>
        <Option>
          <FiLock color="#FFFFFF" />
          <span>Reservas</span>
        </Option>

        <Option>
          <FiSettings color="#FFFFFF" />
          <span>Administração</span>
        </Option>
      </OptionsMenu>
    </Container>
  );
};

export default LeftBar;
