import React, {createContext, ProviderProps, useContext, useMemo} from 'react';
import {APPThemeType, ThemeModeType} from './AppTheme';
import {DarkTheme} from './DarkTheme';
import {StyleSheet} from 'react-native';
import {TypedDictionary, Undefinable} from '../../utils';

export type AppThemeContextModel = {
  theme: APPThemeType;
};

export const AppThemeContext =
  createContext<Undefinable<AppThemeContextModel>>(undefined);

export const AppThemeContextProvider = (
  props: Partial<ProviderProps<AppThemeContextModel>>,
) => {
  const theme = DarkTheme;

  const value = useMemo(() => {
    return {theme};
  }, [theme]);

  return <AppThemeContext.Provider {...props} value={value} />;
};

export const useCustomTheme = () => {
  const AppThemeContextValue = useContext(AppThemeContext)!;

  return useMemo(() => {
    return {...AppThemeContextValue.theme, ...AppThemeContextValue};
  }, [AppThemeContextValue]);
};
export type useCustomThemeType = ReturnType<typeof useCustomTheme>;

export function themeBaseStyleCreate<
  T extends StyleSheet.NamedStyles<any> | StyleSheet.NamedStyles<T>,
>(f: (theme: APPThemeType) => ReturnType<typeof StyleSheet.create<T>>) {
  return {
    dark: StyleSheet.create(f(DarkTheme)),
  } as TypedDictionary<ThemeModeType, ReturnType<typeof f>>;
}
