import { KeyboardAvoidingView, Platform } from 'react-native';

import { Controller, useForm } from 'react-hook-form';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootAuthenticationParamsList } from '@modules/authentication/routes';

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import Scroll from '@modules/components/Scroll';
import Spacer from '@modules/components/Spacer';
import Header from '@modules/components/Header';

import Button from '@modules/components/Button';

import Input from '@modules/components/Inputs/InputText';

import { useCallback } from 'react';
import { Container, Body, Footer, Form } from './styles';

type SignupScreenProps = NativeStackNavigationProp<
  RootAuthenticationParamsList,
  'Signup'
>;

type FormData = {
  name: string;
  email: string;
};

const schema = Yup.object().shape({
  name: Yup.string().required('Informe o seu nome'),
  email: Yup.string().email('Formato inválido').required('Informe o seu email'),
});

const Signup = (): JSX.Element => {
  const { goBack, navigate } = useNavigation<SignupScreenProps>();

  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      name: '',
      email: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = useCallback(
    ({ name, email }: FormData) => {
      navigate('DefinePassword', {
        name,
        email,
      });
    },
    [navigate],
  );

  return (
    <Container>
      <Header title="Sign up" onGoback={goBack} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        enabled
      >
        <Scroll>
          <Body>
            <Form>
              <Controller
                name="name"
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <Input
                    label="nome"
                    onChangeText={onChange}
                    autoCapitalize="words"
                    value={value}
                    error={error}
                  />
                )}
              />
              <Spacer size={16} />
              <Controller
                name="email"
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <Input
                    label="email"
                    onChangeText={onChange}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    value={value}
                    error={error}
                  />
                )}
              />
              <Spacer size={16} />
            </Form>
            <Footer>
              <Button onPress={handleSubmit(onSubmit)}>Próximo</Button>
            </Footer>
          </Body>
        </Scroll>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default Signup;
