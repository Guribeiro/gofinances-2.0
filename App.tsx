import React, { useState, useEffect, useCallback } from 'react';
import { ThemeProvider } from '@shared/hooks/theme';
import { ScreenProvider } from 'responsive-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';

import { AuthenticationProvider } from '@modules/authentication/hooks/authentication';

import { StatusBar, View } from 'react-native';

import Routes from '@shared/routes';

import { loadAsync } from 'expo-font';
import {
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';

const App = (): JSX.Element => {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();

        loadAsync({
          Poppins_300Light,
          Poppins_400Regular,
          Poppins_500Medium,
          Poppins_700Bold,
        });
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return <View />;
  }

  return (
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <ScreenProvider baseFontSize={16}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        <ThemeProvider>
          <AuthenticationProvider>
            <Routes />
          </AuthenticationProvider>
        </ThemeProvider>
      </ScreenProvider>
    </SafeAreaProvider>
  );
};

export default App;
