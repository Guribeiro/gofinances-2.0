import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';

import DrawerItem from './DrawerItem';
import Spacer from '../Spacer';

import Header from './Header';

import { Container } from './styles';

const DrawerContent = ({
  navigation,
  ...rest
}: DrawerContentComponentProps): JSX.Element => {
  return (
    <Container>
      <DrawerContentScrollView {...rest}>
        <Header navigation={navigation} />
        <Spacer size={30} />
        <DrawerItem
          label="Início"
          icon="home"
          onPress={() => navigation.navigate('BillsRoutes')}
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

        <DrawerItem
          label="Sair"
          icon="power"
          onPress={() => console.log('signout')}
        />
      </DrawerContentScrollView>
    </Container>
  );
};

export default DrawerContent;
