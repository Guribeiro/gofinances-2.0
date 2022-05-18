import { createDrawerNavigator } from '@react-navigation/drawer';
import { Dimensions } from 'react-native';
import { useTheme } from '@shared/hooks/theme';

import SettingsRoutes from '@modules/settings/routes';

import Dashboard from '../screens/Dashboard';
import DrawerContent from '../components/DrawerContent';

export type DrawerNavigatorParamsList = {
  Dashboard: undefined;
  SettingsRoutes: undefined;
};

const { Navigator, Screen } =
  createDrawerNavigator<DrawerNavigatorParamsList>();

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
    </Navigator>
  );
};

export default MainRoutes;
