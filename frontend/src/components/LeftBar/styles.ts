import styled from 'styled-components';

export const Container = styled.aside`
  display: flex;
  flex-direction: column;

  width: 100%;
  max-width: 272px;
  background: var(--titles);
`;
export const Logo = styled.img`
  height: 40px;
`;

export const WelcomeText = styled.span`
  width: 100%;
  font-size: 16px;
  color: var(--white);

  margin-top: 32px;
`;

export const Username = styled.strong`
  margin-left: 6px;
`;

export const UserMenu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  padding: 16px;

  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
`;

export const LogoutButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  width: 100%;
  margin-top: 16px;

  cursor: pointer;

  &:hover {
    > svg {
      color: var(--white);
      text-shadow: 0 0 4px var(--white);
    }

    span {
      color: var(--white);
      text-shadow: 0 0 4px var(--white);
    }
  }

  > svg {
    color: rgba(255, 255, 255, 0.5);
    transition: color 0.2s;
  }
`;

export const LogoutButtonText = styled.span`
  font-size: 16px;
  color: rgba(255, 255, 255, 0.5);
  transition: color 0.2s;

  margin-left: 6px;
`;

export const OptionsMenu = styled.div`
  padding: 16px;

  display: flex;
  flex-direction: column;
`;

export const Option = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: 48px;
  margin-top: 16px;
  cursor: pointer;

  span {
    margin-left: 16px;
    color: var(--white);
  }

  &:hover {
    filter: brightness(0.8);
  }
`;
