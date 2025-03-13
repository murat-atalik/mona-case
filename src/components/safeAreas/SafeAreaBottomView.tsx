import React, {useMemo} from 'react';
import {StyleSheet, View, ViewProps} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export type SafeAreaBottomViewProps = ViewProps & {};

export const SafeAreaBottomView = (props: SafeAreaBottomViewProps) => {
  const {bottom} = useSafeAreaInsets();

  const style = useMemo(() => {
    return StyleSheet.compose(
      {
        minHeight: Math.max(bottom, 8),
      },
      props.style,
    );
  }, [bottom, props.style]);

  return <View {...props} style={style} />;
};
