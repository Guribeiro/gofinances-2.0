import React from 'react';
import { MaskedTextInputProps } from 'react-native-mask-text';
import { FieldError } from 'react-hook-form';
import TextError from '@modules/transactions/components/Inputs/TextError';
import {
  Container,
  InputLabel,
  TextInputMasked,
  Prefix,
  TextInputRow,
} from './styles';

interface InputMaskProps extends MaskedTextInputProps {
  label?: string;
  prefix: string;
  required?: boolean;
  error?: FieldError | undefined;
}

const InputMoney = ({
  label,
  prefix,
  required,
  error,
  ...rest
}: InputMaskProps): JSX.Element => (
  <Container>
    <InputLabel>
      {label}
      {required && '*'}
    </InputLabel>
    <TextInputRow error={!!error}>
      <Prefix>{prefix}</Prefix>
      <TextInputMasked
        type="currency"
        options={{
          groupSeparator: '.',
          precision: 2,
          decimalSeparator: ',',
        }}
        keyboardAppearance="dark"
        keyboardType="numeric"
        {...rest}
      />
    </TextInputRow>

    {error && <TextError>{error.message}</TextError>}
  </Container>
);

export default InputMoney;
