import styled from 'styled-components/native';

import { RootSettingsParamsList } from '@modules/settings/routes';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import ThemeSwitcher from '@modules/settings/components/ThemeSwitcher';
import Spacer from '@modules/transactions/components/Spacer';
import Header from '@modules/transactions/components/Header';
import Container from '@shared/components/Container';

const Content = styled.View`
  height: 100%;
  flex: 1;
  padding: 0 ${({ theme }) => theme.screen.rem(1.5)}px;
`;

export const Text = styled.Text`
  color: ${({ theme }) => theme.palett.colors.text};
  font-size: ${({ theme }) => theme.screen.rem(2.4, true)}px;
  font-family: ${({ theme }) => theme.palett.fonts.medium};
`;

export type ThemeScreenProps = NativeStackNavigationProp<
  RootSettingsParamsList,
  'Theme'
>;

const Theme = (): JSX.Element => {
  const { goBack } = useNavigation<ThemeScreenProps>();
  return (
    <Container>
      <Header title="Tema" onGoback={goBack} />

      <Spacer size={32} />
      <Content>
        <ThemeSwitcher />
      </Content>
    </Container>
  );
};

export default Theme;
