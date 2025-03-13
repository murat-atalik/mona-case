import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AppNavigation} from './navigation/AppNavigation';
import {NavigationContainer} from '@react-navigation/native';
import BootSplash from 'react-native-bootsplash';
import {useCallback, useEffect, useState} from 'react';

export const AppContainer = () => {
  const [onReady, setOnReady] = useState(false);
  const splashHide = useCallback(async () => {
    await BootSplash.hide({fade: true});
  }, []);

  useEffect(() => {
    if (onReady) {
      const init = async () => {};
      init().finally(async () => {
        setTimeout(() => {
          splashHide();
        }, 500);
      });
    }
  }, [onReady, splashHide]);

  return (
    <SafeAreaProvider>
      <NavigationContainer
        onReady={() => {
          setOnReady(true);
        }}>
        <AppNavigation />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
