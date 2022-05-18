import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Settings from '../screens/settings';
import Theme from '../screens/theme';

export type RootSettingsParamsList = {
  Settings: undefined;
  Theme: undefined;
};

const { Screen, Navigator } =
  createNativeStackNavigator<RootSettingsParamsList>();

const SettingsRoutes = (): JSX.Element => {
  return (
    <Navigator
      initialRouteName="Settings"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="Settings" component={Settings} />
      <Screen name="Theme" component={Theme} />
    </Navigator>
  );
};

export default SettingsRoutes;
