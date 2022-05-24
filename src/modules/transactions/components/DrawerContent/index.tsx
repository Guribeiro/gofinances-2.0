import { DrawerContentComponentProps } from '@react-navigation/drawer';

import { useAuthentication } from '@modules/authentication/hooks/authentication';
import DrawerItem from './DrawerItem';
import Spacer from '../Spacer';

import Header from './Header';

import { Container, DrawerScrollView } from './styles';

const DrawerContent = ({
  navigation,
  ...rest
}: DrawerContentComponentProps): JSX.Element => {
  const { signOutUser } = useAuthentication();
  return (
    <Container>
      <DrawerScrollView {...rest}>
        <Header navigation={navigation} />
        <Spacer size={30} />
        <DrawerItem
          label="Início"
          icon="home"
          onPress={() => navigation.navigate('BillsRoutes')}
        />

        <DrawerItem
          label="Adicionar nova transação"
          icon="plus"
          onPress={() => navigation.navigate('RegisterTransaction')}
        />

        <DrawerItem
          label="Perfil"
          icon="user"
          onPress={() => navigation.navigate('ProfileRoutes')}
        />
        <DrawerItem
          label="Relatórios"
          icon="paperclip"
          onPress={() => navigation.navigate('ReportsRoutes')}
        />
        <DrawerItem
          label="Configurações"
          icon="settings"
          onPress={() => navigation.navigate('SettingsRoutes')}
        />

        <DrawerItem label="Sair" icon="power" onPress={() => signOutUser()} />
      </DrawerScrollView>
    </Container>
  );
};

export default DrawerContent;
