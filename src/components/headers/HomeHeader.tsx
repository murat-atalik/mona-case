import {StyleSheet, View} from 'react-native';
import React from 'react';
import {SafeAreaTopView} from '../safeAreas';
import {CustomText} from '../CustomText';

export const HomeHeader = () => {
  return (
    <View style={styles.header}>
      <SafeAreaTopView />
      <CustomText fontWeight="800" fontSize={38} lineHeight={45}>
        Liste
      </CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {paddingHorizontal: 20, paddingTop: 8},
});
