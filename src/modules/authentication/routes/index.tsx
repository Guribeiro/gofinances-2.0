import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useTheme } from '@shared/hooks/theme';

import Welcome from '../screens/Welcome';
import Signin from '../screens/Signin';
import Signup from '../screens/Signup';
import DefinePassword from '../screens/DefinePassword';
import SendForgotPasswordEmail from '../screens/SendForgotPasswordEmail';

export type DefinePasswordScreenParamsList = {
  name: string;
  email: string;
};

export type RootAuthenticationParamsList = {
  Welcome: undefined;
  Signin: undefined;
  Signup: undefined;
  SendForgotPasswordEmail: undefined;
  DefinePassword: DefinePasswordScreenParamsList;
};

const { Navigator, Screen } =
  createNativeStackNavigator<RootAuthenticationParamsList>();

const AuthenticationRoutes = (): JSX.Element => {
  const { theme } = useTheme();
  return (
    <Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: theme.palett.colors.primary,
        },
      }}
    >
      <Screen name="Welcome" component={Welcome} />

      <Screen name="Signin" component={Signin} />

      <Screen name="Signup" component={Signup} />

      <Screen name="DefinePassword" component={DefinePassword} />

      <Screen
        name="SendForgotPasswordEmail"
        component={SendForgotPasswordEmail}
      />
    </Navigator>
  );
};

export default AuthenticationRoutes;
