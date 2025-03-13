import React, {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {View, ViewProps} from 'react-native';

export type IDividerProps = ViewProps & {
  horizontal?: boolean;
  vertical?: boolean;
  multiplayer?: number;
  size?: number;
};

const baseSize = 4;

export const Divider = (props: IDividerProps) => {
  let {horizontal, vertical, multiplayer, style, size, ...rest} = props;

  multiplayer = multiplayer ?? 3;
  size = size ?? baseSize;
  size = size * multiplayer;

  const _style = useMemo(() => {
    return StyleSheet.compose(
      [!vertical && {width: size}, !horizontal && {height: size}],
      style,
    );
  }, [style, vertical, size, horizontal]);

  return <View {...rest} style={_style} />;
};

export const DividerXSmall = (props: IDividerProps) => (
  <Divider multiplayer={1} {...props} />
);
export const DividerSmall = (props: IDividerProps) => (
  <Divider multiplayer={2} {...props} />
);
export const DividerLarge = (props: IDividerProps) => (
  <Divider multiplayer={4} {...props} />
);
export const DividerXLarge = (props: IDividerProps) => (
  <Divider multiplayer={5} {...props} />
);
