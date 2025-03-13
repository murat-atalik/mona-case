import React, {memo, useMemo} from 'react';
import {StyleSheet, View, ViewProps} from 'react-native';

export type ExpandProps = ViewProps & {};

export const Expand = memo((props: ExpandProps) => {
  const style = useMemo(() => {
    return StyleSheet.compose(styles.container, props.style);
  }, [props.style]);

  return <View {...props} style={style} />;
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
