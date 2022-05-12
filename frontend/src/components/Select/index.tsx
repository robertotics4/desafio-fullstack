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

interface SelectProps extends InputHTMLAttributes<HTMLSelectElement> {
  label?: string;
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
  isEnabled?: boolean;
  containerStyle?: object;
}

const Select: React.FC<SelectProps> = ({
  label,
  name,
  icon: Icon,
  isEnabled = true,
  containerStyle = {},
  ...rest
}) => {
  const selectRef = useRef<HTMLSelectElement>(null);
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
      ref: selectRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container hasLabel={!!label} isEnabled={!!isEnabled}>
      {label && <label htmlFor={name}>{label}</label>}

      <Content style={containerStyle} isFocused={isFocused} isErrored={!!error}>
        <select
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          defaultValue={defaultValue}
          ref={selectRef}
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

export { Select };
