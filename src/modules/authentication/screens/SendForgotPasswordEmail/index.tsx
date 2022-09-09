import { useCallback, useState } from 'react';

import { KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootAuthenticationParamsList } from '@modules/authentication/routes';

import Spacer from '@modules/transactions/components/Spacer';
import Header from '@modules/transactions/components/Header';
import Input from '@modules/transactions/components/Inputs/InputText';
import Button from '@modules/transactions/components/Button';
import { Text } from '@shared/components/Text';

import { useAuthentication } from '@modules/authentication/hooks/authentication';

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { verifyCodeError } from '@shared/utils/errors/firebase';
import { Container, Body, Form } from './styles';

interface FormData {
  email: string;
}

const schema = yup.object().shape({
  email: yup.string().email().required('Informe seu email'),
});

type SendForgotPasswordEmailScreenParams = NativeStackNavigationProp<
  RootAuthenticationParamsList,
  'SendForgotPasswordEmail'
>;

const SendForgotPasswordEmail = (): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const { sendResetPasswordEmail } = useAuthentication();
  const { goBack } = useNavigation<SendForgotPasswordEmailScreenParams>();

  const { handleSubmit, reset, control } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = useCallback(async ({ email }: FormData) => {
    try {
      setLoading(true);
      await sendResetPasswordEmail({
        email,
      });

      Alert.alert(
        `Um email foi enviado para ${email}, verifique sua caixa de entrada`,
      );
      reset();
    } catch (error) {
      const message = verifyCodeError(error);
      Alert.alert(message);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <Container>
      <Header title="Forgot password" onGoback={goBack} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        enabled
      >
        <Body>
          <Text>Informe seu endereço de email</Text>
          <Spacer size={32} />
          <Form>
            <Controller
              name="email"
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <Input
                  label="email"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  required
                  onChangeText={onChange}
                  value={value}
                  error={error}
                />
              )}
            />
            <Button loading={loading} onPress={handleSubmit(onSubmit)}>
              Enviar
            </Button>
          </Form>
        </Body>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default SendForgotPasswordEmail;
