import React, { useState, useCallback } from 'react';
import { TextInputProps } from 'react-native';
import { FieldError } from 'react-hook-form';
import Feather from '@expo/vector-icons/Feather';
import TextError from '@modules/transactions/components/Inputs/TextError';
import { useTheme } from '@shared/hooks/theme';
import {
  Container,
  InputText,
  InputLabel,
  TextInputRow,
  TogglePasswordVisibilityButton,
} from './styles';

interface PasswordInputProps extends TextInputProps {
  label?: string;
  error?: FieldError | undefined;
}

const InputPassword = ({
  label,
  error,
  ...rest
}: PasswordInputProps): JSX.Element => {
  const [passwordIsHide, setPasswordIsHide] = useState(true);
  const { theme } = useTheme();

  const handlePasswordVisibility = useCallback(() => {
    setPasswordIsHide(prev => !prev);
  }, []);

  return (
    <Container>
      <InputLabel>{label}</InputLabel>
      <TextInputRow error={!!error}>
        <InputText
          keyboardAppearance="dark"
          autoCorrect={false}
          autoCapitalize="none"
          secureTextEntry={passwordIsHide}
          {...rest}
        />
        <TogglePasswordVisibilityButton onPress={handlePasswordVisibility}>
          {passwordIsHide ? (
            <Feather
              name="eye"
              size={theme.screen.rem(1.375, true)}
              color={theme.palett.colors.text}
            />
          ) : (
            <Feather
              name="eye-off"
              size={theme.screen.rem(1.375, true)}
              color={theme.palett.colors.text}
            />
          )}
        </TogglePasswordVisibilityButton>
      </TextInputRow>
      {error && <TextError>{error.message}</TextError>}
    </Container>
  );
};

export default InputPassword;
