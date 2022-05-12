import React, {
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useField } from '@unform/core';

import { FiAlertCircle } from 'react-icons/fi';
import { IconBaseProps } from 'react-icons';
import { Container, Content, Error } from './styles';
import { cpfCnpjMask, phoneMask } from './masks';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  mask?: 'cpfCnpj' | 'phoneMask';
  icon?: React.ComponentType<IconBaseProps>;
  isEnabled?: boolean;
  containerStyle?: object;
}

const Input: React.FC<InputProps> = ({
  label,
  name,
  mask,
  icon: Icon,
  isEnabled = true,
  containerStyle = {},
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, defaultValue, error, registerField } = useField(name);
  const [isFocused, setIsFocused] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  const handleKeyUp = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      if (mask === 'cpfCnpj') {
        cpfCnpjMask(e);
      }

      if (mask === 'phoneMask') {
        phoneMask(e);
      }
    },
    [mask],
  );

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container hasLabel={!!label} isEnabled={!!isEnabled}>
      {label && <label htmlFor={name}>{label}</label>}

      <Content style={containerStyle} isFocused={isFocused} isErrored={!!error}>
        <input
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          defaultValue={defaultValue}
          ref={inputRef}
          onKeyUp={handleKeyUp}
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

export { Input };
