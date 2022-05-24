import { createDrawerNavigator } from '@react-navigation/drawer';
import { Dimensions } from 'react-native';
import { useTheme } from '@shared/hooks/theme';

import SettingsRoutes from '@modules/settings/routes';
import ProfileRoutes from '@modules/profile/routes';

import Dashboard from '../screens/Dashboard';
import DrawerContent from '../components/DrawerContent';
import RegisterTransaction from '../screens/RegisterTransaction';

export type RootMainParamsList = {
  Dashboard: undefined;
  RegisterTransaction: undefined;
  SettingsRoutes: undefined;
  ProfileRoutes: undefined;
};

const { Navigator, Screen } = createDrawerNavigator<RootMainParamsList>();

const MainRoutes = (): JSX.Element => {
  const { theme } = useTheme();
  return (
    <Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        drawerType: 'front',
        headerShown: false,
        sceneContainerStyle: {
          backgroundColor: theme.palett.colors.primary,
        },
        drawerPosition: 'right',
        overlayColor: 'none',
        drawerStyle: {
          flex: 1,
          width: Dimensions.get('screen').width,
          height: Dimensions.get('screen').height,
          justifyContent: 'center',
          backgroundColor: 'none',
        },
      }}
      drawerContent={props => <DrawerContent {...props} />}
    >
      <Screen name="Dashboard" component={Dashboard} />

      <Screen name="SettingsRoutes" component={SettingsRoutes} />

      <Screen name="RegisterTransaction" component={RegisterTransaction} />

      <Screen name="ProfileRoutes" component={ProfileRoutes} />
    </Navigator>
  );
};

export default MainRoutes;
