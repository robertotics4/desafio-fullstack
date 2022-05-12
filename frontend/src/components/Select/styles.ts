import styled, { css } from 'styled-components';
import Tooltip from '../Tooltip';

interface ContainerProps {
  hasLabel: boolean;
  isEnabled: boolean;
}

interface ContentProps {
  isFocused: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;

  & + div {
    margin-top: 16px;
  }

  label {
    color: var(--titles);

    ${props =>
      props.hasLabel &&
      css`
        margin-bottom: 8px;
      `}
  }

  ${props =>
    !props.isEnabled &&
    css`
      display: none;
    `}
`;

export const Content = styled.div<ContentProps>`
  background: var(--background);
  border-radius: 10px;
  padding: 16px;
  width: 100%;

  border: 2px solid var(--background);
  color: var(--texts);

  display: flex;
  align-items: center;
  position: relative;
  transition: border-color 0.2s;

  ${props =>
    props.isFocused &&
    css`
      color: var(--titles);
      border-color: var(--titles);
    `}

  ${props =>
    props.isErrored &&
    css`
      border-color: var(--errors);
    `}

  select {
    appearance: none;
    border: none;
    padding: 8px;
    margin: 0;
    width: 100%;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    flex: 1;
    background: transparent;
    color: #6b6969;
    cursor: pointer;

    option:checked {
      color: #bfb9bb;
    }
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }
  span {
    text-align: center;
    background: var(--errors);
    color: var(--white);
    &::before {
      border-color: var(--errors) transparent;
    }
  }
`;
