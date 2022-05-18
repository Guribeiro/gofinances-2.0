import { useCallback } from 'react';
import {
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import { Controller, useForm } from 'react-hook-form';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootAuthenticationParamsList } from '@modules/authentication/routes';

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { useAuthentication } from '@modules/authentication/hooks/authentication';

import Scroll from '@modules/main/components/Scroll';
import Spacer from '@modules/main/components/Spacer';
import Header from '@modules/main/components/Header';

import Button from '@modules/main/components/Button';
import ButtonSignin from '@modules/main/components/ButtonSignin';

import Input from '@modules/main/components/Inputs/InputText';
import InputPassword from '@modules/main/components/Inputs/InputPassword';

import AppleIcon from '../../assets/apple-icon.svg';
import GoogleIcon from '../../assets/google-icon.svg';

import {
  Container,
  Body,
  Footer,
  SocialSigninContainer,
  SocialSigninLabel,
  SocialSigninWrapper,
  SeparatorContainer,
  SeparatorText,
  SeparatorLine,
  Form,
  ForgotPasswordContainer,
  ForgotPasswordButtonText,
  CreateNewAccountText,
} from './styles';

type SigninScreenProps = NativeStackNavigationProp<
  RootAuthenticationParamsList,
  'Signin'
>;

type FormData = {
  email: string;
  password: string;
};

const schema = Yup.object().shape({
  email: Yup.string().email('Formato inválido').required('Informe o seu email'),
  password: Yup.string()
    .min(8, 'Formato inválido, mínimo de 08 caracteres')
    .required('Senha é um campo obrigatório'),
});

const Signin = (): JSX.Element => {
  const { signInWithGoogle, signInWithApple } = useAuthentication();
  const { goBack, navigate } = useNavigation<SigninScreenProps>();

  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const handleSignInWithEmailAndPassword = useCallback(
    async ({ email, password }: FormData) => {
      try {
        console.log({ email, password });
      } catch (error) {
        console.log(error);
      }
    },
    [],
  );

  const handleSignInWithGoogle = useCallback(async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      Alert.alert(error as string);
    }
  }, [signInWithGoogle]);

  const handleSignInWithApple = useCallback(async () => {
    try {
      await signInWithApple();
    } catch (error) {
      Alert.alert(error as string);
    }
  }, [signInWithApple]);

  return (
    <Container>
      <Header title="Sign in" onGoback={goBack} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        enabled
      >
        <Scroll>
          <Body>
            <SocialSigninContainer>
              <SocialSigninLabel>
                Entrar com umas das seguintes opções
              </SocialSigninLabel>
              <SocialSigninWrapper platform={Platform.OS}>
                <ButtonSignin
                  svg={GoogleIcon}
                  onPress={handleSignInWithGoogle}
                />
                {Platform.OS === 'ios' && (
                  <ButtonSignin
                    svg={AppleIcon}
                    onPress={handleSignInWithApple}
                  />
                )}
              </SocialSigninWrapper>
            </SocialSigninContainer>
            <Spacer size={32} />
            <SeparatorContainer>
              <SeparatorLine />
              <SeparatorText>ou</SeparatorText>
              <SeparatorLine />
            </SeparatorContainer>
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
                    onChangeText={onChange}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    value={value}
                    error={error}
                  />
                )}
              />
              <Spacer size={16} />

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
              <ForgotPasswordContainer>
                <TouchableOpacity>
                  <ForgotPasswordButtonText>
                    Esqueci minha senha
                  </ForgotPasswordButtonText>
                </TouchableOpacity>
              </ForgotPasswordContainer>
            </Form>
            <Footer>
              <Button onPress={handleSubmit(handleSignInWithEmailAndPassword)}>
                Log in
              </Button>
              <Spacer size={32} />
              <TouchableOpacity onPress={() => navigate('Signup')}>
                <CreateNewAccountText>
                  Novo no gofinances? Crie sua conta
                </CreateNewAccountText>
              </TouchableOpacity>
            </Footer>
          </Body>
        </Scroll>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default Signin;
