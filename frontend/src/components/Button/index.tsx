import React, { ButtonHTMLAttributes } from 'react';
import Spinner from 'react-spinkit';

import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

const Button: React.FC<ButtonProps> = ({ children, loading, ...rest }) => (
  <Container type="button" {...rest}>
    {loading ? <Spinner name="double-bounce" color="#ffffff" /> : children}
  </Container>
);

export default Button;
