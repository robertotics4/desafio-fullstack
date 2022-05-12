import React, {
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useField } from '@unform/core';

import { FiAlertCircle } from 'react-icons/fi';
import { Container, Content, Error } from './styles';

interface TextAreaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  name: string;
  isEnabled?: boolean;
  containerStyle?: object;
}

const TextArea: React.FC<TextAreaProps> = ({
  label,
  name,
  isEnabled = true,
  containerStyle = {},
  ...rest
}) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const { fieldName, defaultValue, error, registerField } = useField(name);
  const [isFocused, setIsFocused] = useState(false);

  const handleTextAreaFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleTextAreaBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: textAreaRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container hasLabel={!!label} isEnabled={!!isEnabled}>
      {label && <label htmlFor={name}>{label}</label>}

      <Content style={containerStyle} isFocused={isFocused} isErrored={!!error}>
        <textarea
          onFocus={handleTextAreaFocus}
          onBlur={handleTextAreaBlur}
          defaultValue={defaultValue}
          ref={textAreaRef}
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

export { TextArea };
