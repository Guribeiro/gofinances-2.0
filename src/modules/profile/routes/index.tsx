import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '@shared/hooks/theme';
import Profile from '../screens/Profile';
import UpdateName from '../screens/updateName';

export type RootProfileParamsList = {
  Profile: undefined;
  UpdateName: undefined;
};

const { Navigator, Screen } =
  createNativeStackNavigator<RootProfileParamsList>();

const ProfileRoutes = (): JSX.Element => {
  const { theme } = useTheme();
  return (
    <Navigator
      initialRouteName="Profile"
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: theme.palett.colors.primary,
        },
      }}
    >
      <Screen name="Profile" component={Profile} />
      <Screen name="UpdateName" component={UpdateName} />
    </Navigator>
  );
};

export default ProfileRoutes;
