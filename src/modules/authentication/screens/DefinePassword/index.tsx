import { KeyboardAvoidingView, Platform } from 'react-native';

import { Controller, useForm } from 'react-hook-form';
import { Alert } from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  RootAuthenticationParamsList,
  DefinePasswordScreenParamsList,
} from '@modules/authentication/routes';

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import Scroll from '@modules/main/components/Scroll';
import Spacer from '@modules/main/components/Spacer';
import Header from '@modules/main/components/Header';

import Button from '@modules/main/components/Button';

import InputPassword from '@modules/main/components/Inputs/InputPassword';

import { useCallback, useState } from 'react';
import { useAuthentication } from '@modules/authentication/hooks/authentication';
import { Container, Body, Footer, Form } from './styles';

type DefinePasswordScreenProps = NativeStackNavigationProp<
  RootAuthenticationParamsList,
  'DefinePassword'
>;

type FormData = {
  password: string;
  passwordConfirmation: string;
};

const schema = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Formato inválido, mínimo de 08 caracteres')
    .required('Senha é um campo obrigatório'),
  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'As senhas devem coincidir',
  ),
});
const DefinePassword = (): JSX.Element => {
  const [loading, setLoading] = useState(false);

  const { goBack } = useNavigation<DefinePasswordScreenProps>();
  const { params } = useRoute();
  const { signUp } = useAuthentication();

  const { name, email } = params as DefinePasswordScreenParamsList;

  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      password: '',
      passwordConfirmation: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = useCallback(
    async ({ password }: FormData) => {
      try {
        setLoading(true);
        await signUp({
          name,
          email,
          password,
        });
      } catch (error) {
        Alert.alert(error as string);
        setLoading(false);
      }
    },
    [email, name, signUp],
  );

  return (
    <Container>
      <Header title="Choose password" onGoback={goBack} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        enabled
      >
        <Scroll>
          <Body>
            <Form>
              <Controller
                name="password"
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <InputPassword
                    label="senha"
                    onChangeText={onChange}
                    value={value}
                    error={error}
                  />
                )}
              />
              <Spacer size={16} />
              <Controller
                name="passwordConfirmation"
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <InputPassword
                    label="confirmar senha"
                    onChangeText={onChange}
                    value={value}
                    error={error}
                  />
                )}
              />
              <Spacer size={16} />
            </Form>
            <Footer>
              <Button loading={loading} onPress={handleSubmit(onSubmit)}>
                Log in
              </Button>
            </Footer>
          </Body>
        </Scroll>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default DefinePassword;
