import * as React from 'react';
import {ColorValue} from 'react-native';
import Svg, {SvgProps, Circle} from 'react-native-svg';

type LiveIconProps = SvgProps & {
  color1?: ColorValue;
  color2?: ColorValue;
  color3?: ColorValue;
};

export const LiveIcon = (props: LiveIconProps) => {
  const {color1 = '#FF3A30', color2 = '#FF3A30', color3 = '#FF3A30'} = props;
  return (
    <Svg width={10} height={10} viewBox="0 0 10 10" fill="none" {...props}>
      <Circle cx={5} cy={5} r={4.16667} stroke={color1} strokeWidth={1.66667} />
      <Circle cx={5} cy={5} r={3.33333} fill={color2} />
      <Circle cx={5.0026} cy={4.99967} r={1.66667} fill={color3} />
    </Svg>
  );
};
