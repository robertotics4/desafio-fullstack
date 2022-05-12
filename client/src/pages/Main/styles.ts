import styled from 'styled-components';
import Button from '../../components/Button';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 100vh;
`;

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 500px;
  width: 60%;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  width: 100%;

  img {
    width: 200px;
  }
`;

export const Title = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const UserEmail = styled.span`
  margin-top: 16px;

  font-family: 'Roboto Slab';
  color: var(--titles);
`;

export const LogoutButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  width: 100%;
  cursor: pointer;

  svg {
    margin-left: 16px;
  }

  &:hover {
    > svg {
      color: var(--placeholders);
    }

    span {
      color: var(--placeholders);
    }
  }

  > svg {
    color: var(--titles);
    transition: color 0.2s;
  }
`;

export const LogoutButtonText = styled.span`
  font-size: 16px;
  color: var(--titles);
  transition: color 0.2s;
`;

export const PresentationsList = styled.ul`
  margin-top: 36px;
  width: 100%;
`;

export const PresentationItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  height: 80px;

  & + div {
    border-top: 1px solid var(--placeholders);
  }
`;

export const PresentationInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  h2 {
    font-size: 24px;
    color: var(--titles);
  }

  span {
    margin-left: 16px;
    font-size: 16px;
    color: var(--texts);
  }
`;

export const ActionsMenu = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Action = styled.div`
  cursor: pointer;
  & + div {
    margin-left: 16px;
  }
`;

export const RegisterPresentationButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  padding: 12px;
  margin-top: 24px;
  margin-left: auto;
  border: none;
  border-radius: 8px;
  background-color: var(--titles);
  color: var(--white);

  svg {
    margin-right: 8px;
  }
`;

export const ProfileButton = styled.button`
  margin-top: 16px;
  padding: 8px;
  border: none;
  border-radius: 8px;
  background: var(--success);
  color: var(--titles);
  transition: filter 0.2s;

  &:hover {
    filter: brightness(0.8);
  }
`;
