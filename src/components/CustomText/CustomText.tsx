import {ColorValue, StyleSheet, Text, TextProps, TextStyle} from 'react-native';
import React, {useContext, useMemo} from 'react';
import {useCustomTheme} from '../../library/theme/useCustomTheme';
import {CustomTextContext} from './CustomTextContextProvider';
import {_centerText} from './customTextConstants';

export type FontType =
  | 'normal'
  | 'bold'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900'
  | undefined;

export type CustomTextProps = {
  color?: ColorValue;
  fontSize?: number;
  lineHeight?: number;
  fontWeight?: FontType;
  centerText?: boolean;
} & TextProps;

export const CustomText = (props: CustomTextProps) => {
  const theme = useCustomTheme();
  const ctx = useContext(CustomTextContext);
  const combinedProps = {...ctx, ...props};
  const {
    style,
    color = theme.labels.primary,
    fontSize = 12,
    lineHeight = 16,
    fontWeight = '400',
  } = combinedProps;

  const calcStyle = useMemo<TextStyle>(() => {
    return StyleSheet.flatten([
      {
        fontWeight,
        fontSize,
        lineHeight,
        color,
      },
      StyleSheet.flatten(ctx.style),
      props.centerText && _centerText,
      StyleSheet.flatten(style),
    ]);
  }, [
    color,
    ctx.style,
    fontSize,
    fontWeight,
    lineHeight,
    props.centerText,
    style,
  ]);

  return (
    <Text
      {...ctx}
      allowFontScaling={false}
      {...props}
      style={[{}, calcStyle]}
    />
  );
};
