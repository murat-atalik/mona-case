import {StyleSheet, View} from 'react-native';
import React from 'react';
import {CustomText} from '../CustomText';

export const HomeStockListHeader = () => {
  return (
    <View style={styles.header}>
      <CustomText fontWeight="600" fontSize={17} lineHeight={22}>
        Semboller
      </CustomText>
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    height: 54,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
});
