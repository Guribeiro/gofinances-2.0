import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '@modules/authentication/screens/Splash';
import AuthenticationRoutes from '@modules/authentication/routes';
import MainRoutes from '@modules/main/routes';

import { useAuthentication } from '@modules/authentication/hooks/authentication';
import { useTheme } from '@shared/hooks/theme';

export type RootSplashParamsList = {
  Splash: undefined;
  Home: undefined;
};

const { Navigator, Screen } =
  createNativeStackNavigator<RootSplashParamsList>();

const SplashRoutes = (): JSX.Element => {
  const { user } = useAuthentication();
  const { theme } = useTheme();
  return (
    <Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: theme.palett.colors.primary,
        },
      }}
    >
      <Screen name="Splash" component={Splash} />
      <Screen
        name="Home"
        component={user.id ? MainRoutes : AuthenticationRoutes}
      />
    </Navigator>
  );
};

export default SplashRoutes;
