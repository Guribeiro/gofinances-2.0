import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '@shared/hooks/theme';
import Reports from '../screens/reports';

export type RootReportsParamsList = {
  Reports: undefined;
};

const { Screen, Navigator } =
  createNativeStackNavigator<RootReportsParamsList>();

const ReportsRoutes = (): JSX.Element => {
  const { theme } = useTheme();
  return (
    <Navigator
      initialRouteName="Reports"
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: theme.palett.colors.shape,
        },
      }}
    >
      <Screen name="Reports" component={Reports} />
    </Navigator>
  );
};

export default ReportsRoutes;
