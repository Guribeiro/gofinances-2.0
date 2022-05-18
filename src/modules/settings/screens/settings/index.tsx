import styled from 'styled-components/native';
import Container from '@shared/components/Container';
import Spacer from '@modules/main/components/Spacer';
import NavigateButton from '@shared/components/NavigateButton';
import { RootSettingsParamsList } from '@modules/settings/routes';
import { useNavigation } from '@react-navigation/native';

import Header from '@modules/main/components/Header';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export const Text = styled.Text`
  color: ${({ theme }) => theme.palett.colors.text};
  font-size: ${({ theme }) => theme.screen.rem(2.4, true)}px;
  font-family: ${({ theme }) => theme.palett.fonts.medium};
`;

const Content = styled.View`
  padding: 0 ${({ theme }) => theme.screen.rem(1.5)}px;
`;

export type SettingsScreenProps = NativeStackNavigationProp<
  RootSettingsParamsList,
  'Settings'
>;

const Settings = (): JSX.Element => {
  const { navigate, goBack } = useNavigation<SettingsScreenProps>();
  return (
    <Container>
      <Header title="Configurações" onGoback={goBack} />

      <Spacer size={32} />
      <Content>
        <NavigateButton
          label="Tema"
          icon="color-palette"
          onPress={() => navigate('Theme')}
        />
      </Content>
    </Container>
  );
};

export default Settings;
