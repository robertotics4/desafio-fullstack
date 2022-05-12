import styled from 'styled-components';

export const Container = styled.button`
  background-color: var(--blue-900);
  height: 56px;
  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  color: var(--white);
  width: 100%;
  margin-top: 32px;
  transition: filter 0.2s;

  &:hover {
    filter: brightness(0.7);
  }
`;
