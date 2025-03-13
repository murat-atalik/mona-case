import {View} from 'react-native';
import React from 'react';
import {
  themeBaseStyleCreate,
  useCustomTheme,
} from '../../library/theme/useCustomTheme';
import {CustomText} from '../CustomText';

type NewsBadgeProps = {
  count: number;
};
export const NewsBadge = (props: NewsBadgeProps) => {
  const {count} = props;
  const theme = useCustomTheme();
  const styles = themed_style[theme.mode];
  if (count < 0) {
    return <></>;
  }
  return (
    <View style={styles?.wrapper}>
      <CustomText
        fontSize={15}
        lineHeight={20}
        numberOfLines={1}
        color={theme.badge.text}>
        +{count}
      </CustomText>
    </View>
  );
};

const themed_style = themeBaseStyleCreate(theme => {
  return {
    wrapper: {
      padding: 6,
      borderRadius: 16,
      height: 32,
      alignItems: 'center',
      backgroundColor: theme.badge.background,
    },
  };
});
