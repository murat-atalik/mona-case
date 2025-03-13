import {Image, View} from 'react-native';
import React from 'react';
import {
  themeBaseStyleCreate,
  useCustomTheme,
} from '../../library/theme/useCustomTheme';
import {useAppSelector} from '../../hooks';
import {CustomText} from '../CustomText';

type NewsStockBadgeProps = {
  symbolId: string;
};
export const NewsStockBadge = (props: NewsStockBadgeProps) => {
  const {symbolId} = props;
  const stock = useAppSelector(s => s.stockCache?.[symbolId]);
  const theme = useCustomTheme();
  const styles = themed_style[theme.mode];

  return (
    <View style={styles?.wrapper}>
      <Image source={{uri: stock?.logo}} style={styles?.image} />
      <CustomText
        fontSize={15}
        lineHeight={20}
        numberOfLines={1}
        color={theme.badge.text}>
        {stock?.code}
      </CustomText>
    </View>
  );
};

const themed_style = themeBaseStyleCreate(theme => {
  return {
    wrapper: {
      gap: 4,
      paddingVertical: 6,
      paddingHorizontal: 12,
      borderRadius: 16,
      height: 32,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.badge.background,
    },
    image: {
      width: 14,
      height: 14,
      borderRadius: 7,
      overflow: 'hidden',
      backgroundColor: theme.labels.secondary,
    },
  };
});
