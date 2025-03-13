import {Image, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useAppSelector} from '../../hooks';
import {shallowEqual} from 'react-redux';
import {CustomText} from '../CustomText';
import {ChevronRightIcon} from '../../icons';
import {
  themeBaseStyleCreate,
  useCustomTheme,
} from '../../library/theme/useCustomTheme';

type HomeStockItemProps = {
  id: string;
  transparent?: boolean;
  onPress?: () => void;
};

export const HomeStockItem = (props: HomeStockItemProps) => {
  const {id, transparent, onPress} = props;
  const theme = useCustomTheme();
  const styles = themed_style[theme.mode];
  const {code, desc, logo} =
    useAppSelector(s => s.stockCache?.[id], shallowEqual) ?? {};

  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          styles?.wrapper,
          {
            backgroundColor: transparent
              ? theme.stockItem.background.primary
              : theme.stockItem.background.secondary,
          },
        ]}>
        <View style={styles?.imageWrapper}>
          <Image source={{uri: logo}} style={styles?.image} />
        </View>
        <View style={styles?.flex}>
          <CustomText
            fontSize={15}
            lineHeight={20}
            color={theme.labels.primary}>
            {code}
          </CustomText>
          <CustomText
            fontSize={13}
            lineHeight={20}
            color={theme.labels.secondary}
            numberOfLines={1}>
            {desc}
          </CustomText>
        </View>
        <View>
          <ChevronRightIcon color={theme.stockItem.icon} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const themed_style = themeBaseStyleCreate(theme => {
  return {
    wrapper: {
      flex: 1,
      flexDirection: 'row',
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme.stockItem.border,
      gap: 12,
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    imageWrapper: {
      width: 40,
      height: 40,
      borderRadius: 20,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: theme.stockItem.border,
      padding: 4,
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {width: 32, height: 32, borderRadius: 16, overflow: 'hidden'},
    flex: {flex: 1},
  };
});
