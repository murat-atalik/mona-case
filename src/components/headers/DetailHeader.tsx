import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaTopView} from '../safeAreas';
import {ChevronLeftIcon} from '../../icons';
import {CustomText} from '../CustomText';
import {DividerSmall} from '../Divider';

type DetailHeaderProps = {
  title: string;
};
export const DetailHeader = (props: DetailHeaderProps) => {
  const {title} = props;
  const navigation = useNavigation();
  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <SafeAreaTopView />
      <DividerSmall />
      <View style={styles.wrapper}>
        <TouchableOpacity onPress={goBack} style={styles.button} hitSlop={10}>
          <View style={styles.button}>
            <ChevronLeftIcon />
          </View>
        </TouchableOpacity>
        <CustomText
          fontWeight="600"
          fontSize={15}
          lineHeight={20}
          centerText
          style={styles.text}>
          {title}
        </CustomText>
        <View style={styles.button} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    width: 15,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  text: {flex: 1},
});
