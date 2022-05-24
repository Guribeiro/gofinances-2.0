import { useCallback, useState } from 'react';
import {
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import { Controller, useForm } from 'react-hook-form';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { useAuthentication } from '@modules/authentication/hooks/authentication';
import { RootAuthenticationParamsList } from '@modules/authentication/routes';

import Scroll from '@modules/transactions/components/Scroll';
import Spacer from '@modules/transactions/components/Spacer';
import Header from '@modules/transactions/components/Header';

import Button from '@modules/transactions/components/Button';
import ButtonSignin from '@modules/transactions/components/ButtonSignin';

import Input from '@modules/transactions/components/Inputs/InputText';
import InputPassword from '@modules/transactions/components/Inputs/InputPassword';

import { verifyCodeError } from '@shared/utils/errors/firebase';

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
  const [loading, setLoading] = useState(false);

  const { signInWithGoogle, signInWithApple, signInWithCredentials } =
    useAuthentication();
  const { goBack, navigate } = useNavigation<SigninScreenProps>();

  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const handleSignInWithCredentials = useCallback(
    async ({ email, password }: FormData) => {
      try {
        setLoading(true);
        await signInWithCredentials({
          email,
          password,
        });
      } catch (error) {
        const message = verifyCodeError(error);
        Alert.alert(message);
        setLoading(false);
      }
    },
    [signInWithCredentials],
  );

  const handleSignInWithGoogle = useCallback(async () => {
    try {
      setLoading(true);
      await signInWithGoogle();
    } catch (error) {
      const message = verifyCodeError(error);
      Alert.alert(message);
      setLoading(false);
    }
  }, [signInWithGoogle]);

  const handleSignInWithApple = useCallback(async () => {
    try {
      setLoading(true);
      await signInWithApple();
    } catch (error) {
      const message = verifyCodeError(error);
      Alert.alert(message);
      setLoading(false);
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
              <Button
                loading={loading}
                onPress={handleSubmit(handleSignInWithCredentials)}
              >
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
