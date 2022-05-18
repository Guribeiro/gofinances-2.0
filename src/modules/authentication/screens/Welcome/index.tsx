import Button from '@modules/components/Button';
import { useTheme } from '@shared/hooks/theme';

import { RootAuthenticationParamsList } from '@modules/authentication/routes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import Logo from '../../assets/logo.svg';

import {
  Container,
  Body,
  Content,
  Title,
  SigninText,
  Footer,
  FooterWrapper,
} from './styles';

type WelcomeScreenProps = NativeStackNavigationProp<
  RootAuthenticationParamsList,
  'Welcome'
>;

const Welcome = (): JSX.Element => {
  const { theme } = useTheme();
  const { navigate } = useNavigation<WelcomeScreenProps>();
  return (
    <Container>
      <Body>
        <Content>
          <Logo />
          <Title>Controle suas finanças de forma muito simples</Title>
        </Content>
        <SigninText>
          Tenha o controle dos seus gastos {'\n'} na palma da sua mão {'\n'}
        </SigninText>
      </Body>
      <Footer>
        <FooterWrapper>
          <Button
            onPress={() => navigate('Signin')}
            backgroundColor={theme.palett.colors.primary}
          >
            Log in
          </Button>
        </FooterWrapper>
      </Footer>
    </Container>
  );
};

export default Welcome;
