import 'intl';
import 'intl/locale-data/jsonp/en';
import React, { useState, useEffect, useCallback } from 'react';
import { StatusBar, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useAuthentication } from '@modules/authentication/hooks/authentication';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ScreenProvider } from 'responsive-native';

import Lottie from '@shared/components/Lottie';

import { loadAsync } from 'expo-font';
import {
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';

import AppProvider from '@shared/hooks';
import Routes from '@shared/routes';

const App = (): JSX.Element => {
  const [appIsReady, setAppIsReady] = useState(false);

  const { persistedLoading } = useAuthentication();

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

  if (!appIsReady && !persistedLoading) {
    return (
      <View
        style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}
      >
        <Lottie />
      </View>
    );
  }

  return (
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <ScreenProvider baseFontSize={16}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        <AppProvider>
          <Routes />
        </AppProvider>
      </ScreenProvider>
    </SafeAreaProvider>
  );
};

export default App;
