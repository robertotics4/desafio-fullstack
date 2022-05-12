import styled from 'styled-components';

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 0px 36px;

  h1 {
    color: var(--titles);
    text-align: center;
  }

  div {
    h2 {
      margin: 16px;
      color: var(--titles);
      text-align: center;
    }

    p {
      line-height: 36px;
      font-size: 18px;
    }
  }
`;
