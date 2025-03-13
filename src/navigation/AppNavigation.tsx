import React, {ComponentProps, useMemo} from 'react';
import {ThemeProvider, useTheme} from '@react-navigation/native';
import {HomeScreen} from '../screens/HomeScreen';
import {DetailsScreen} from '../screens/DetailsScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Expand} from '../components';
import {ObjectOptionType} from '../utils';
import {useCustomTheme} from '../library/theme/useCustomTheme';

export type AppStackParamList = {
  Home: undefined;
  Details: {id: string};
};
const Stack = createNativeStackNavigator<AppStackParamList>();

export const AppNavigation = () => {
  const current_theme = useTheme();
  const theme = useCustomTheme();

  const nav_theme = useMemo(() => {
    return {
      ...current_theme,
      colors: {
        ...current_theme.colors,
        background: theme.background as string,
      },
    };
  }, [current_theme, theme.background]);

  const screenOptions = useMemo<
    ObjectOptionType<
      NonNullable<ComponentProps<typeof Stack.Navigator>['screenOptions']>
    >
  >(() => {
    return {
      headerShown: false,
      headerBackTitleVisible: false,
      headerStyle: {
        backgroundColor: theme.background as string,
      },
      contentStyle: {
        backgroundColor: theme.background,
      },
      animation: 'fade',
    };
  }, [theme.background]);

  return (
    <Expand>
      <ThemeProvider value={nav_theme}>
        <Stack.Navigator screenOptions={screenOptions} initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>
      </ThemeProvider>
    </Expand>
  );
};
