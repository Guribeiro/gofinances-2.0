import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useAuthentication } from '@modules/authentication/hooks/authentication';

import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import { useTheme } from '@shared/hooks/theme';
import { Container, CloseDrawerButton, Text, TextEmphasized } from './styles';

interface HeaderProps {
  navigation: DrawerNavigationHelpers;
}

const Header = ({ navigation }: HeaderProps): JSX.Element => {
  const { theme } = useTheme();
  const { closeDrawer } = navigation;
  const { user } = useAuthentication();

  return (
    <Container>
      <Text>
        Olá, <TextEmphasized>{user.name}</TextEmphasized>
      </Text>
      <CloseDrawerButton onPress={() => closeDrawer()}>
        <Feather
          name="x"
          size={theme.screen.rem(1.5, true)}
          color={theme.palett.colors.shape}
        />
      </CloseDrawerButton>
    </Container>
  );
};

export default Header;
