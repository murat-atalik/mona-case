import React, {useMemo} from 'react';
import {StatusBar} from 'react-native';
import {useCustomTheme} from '../../library/theme/useCustomTheme';

export const AppStatusBar = () => {
  const theme = useCustomTheme();

  return useMemo(() => {
    return (
      <StatusBar
        backgroundColor={'transparent'}
        barStyle={theme.mode === 'dark' ? 'light-content' : 'dark-content'}
        translucent
      />
    );
  }, [theme.mode]);
};
