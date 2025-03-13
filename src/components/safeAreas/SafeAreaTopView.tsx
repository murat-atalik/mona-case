import React, {memo, useMemo} from 'react';
import {StyleSheet, View, ViewProps} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export type SafeAreaTopViewProps = ViewProps & {};

export const SafeAreaTopView = memo((props: SafeAreaTopViewProps) => {
  const {top} = useSafeAreaInsets();

  const style = useMemo(() => {
    return StyleSheet.compose(
      {
        minHeight: Math.max(top, 8),
      },
      props.style,
    );
  }, [top, props.style]);

  return <View {...props} style={style} />;
});
