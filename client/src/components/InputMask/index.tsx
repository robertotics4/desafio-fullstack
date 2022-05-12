import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useField } from '@unform/core';
import ReactInputMask, { Props } from 'react-input-mask';

import { FiAlertCircle } from 'react-icons/fi';
import { IconBaseProps } from 'react-icons';
import { Container, Content, Error } from './styles';

interface InputProps extends Props {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
}

const InputMask: React.FC<InputProps> = ({ name, icon: Icon, ...rest }) => {
  const inputRef = useRef(null);
  const { fieldName, defaultValue, error, registerField } = useField(name);
  const [isFocused, setIsFocused] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container>
      <Content isFocused={isFocused} isErrored={!!error}>
        <ReactInputMask
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          defaultValue={defaultValue}
          ref={inputRef}
          {...rest}
        />

        {error && (
          <Error title={error}>
            <FiAlertCircle color="#ff5353" size={20} />
          </Error>
        )}
      </Content>
    </Container>
  );
};

export { InputMask };
