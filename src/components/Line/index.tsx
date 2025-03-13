import {View} from 'react-native';
import React from 'react';
import {
  themeBaseStyleCreate,
  useCustomTheme,
} from '../../library/theme/useCustomTheme';

export const Line = () => {
  const theme = useCustomTheme();
  const styles = themed_style[theme.mode];
  return <View style={styles?.wrapper} />;
};

const themed_style = themeBaseStyleCreate(theme => {
  return {
    wrapper: {
      width: '100%',
      height: 1,
      backgroundColor: theme.sectionBorder,
    },
  };
});
