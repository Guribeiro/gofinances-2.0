import React from 'react';
import { TextInputProps } from 'react-native';
import { FieldError } from 'react-hook-form';
import TextError from '@modules/components/Inputs/TextError';
import { Container, InputText, InputLabel, TextInputRow } from './styles';

interface InputProps extends TextInputProps {
  label?: string;
  required?: boolean;
  error?: FieldError | undefined;
}

const Input = ({
  label,
  required,
  error,
  ...rest
}: InputProps): JSX.Element => {
  return (
    <Container>
      {error && <TextError>{error.message}</TextError>}
      <InputLabel>
        {label}
        {required && '*'}
      </InputLabel>
      <TextInputRow error={!!error}>
        <InputText
          keyboardAppearance="dark"
          autoCapitalize="sentences"
          autoCorrect={false}
          {...rest}
        />
      </TextInputRow>
    </Container>
  );
};

export default Input;
