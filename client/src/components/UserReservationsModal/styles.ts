import styled from 'styled-components';

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  max-width: 600px;
  padding: 0px 24px;
`;

export const PresentationImage = styled.img`
  width: 60%;
  height: auto;
  border-radius: 10px;
`;

export const PresentationName = styled.h1`
  margin-top: 16px;

  color: var(--titles);
`;

export const PresentationDescription = styled.p`
  font-size: 16px;
  margin-top: 16px;
  line-height: 24px;
  text-align: justify;
`;

export const Username = styled.p``;
export const Type = styled.p``;
