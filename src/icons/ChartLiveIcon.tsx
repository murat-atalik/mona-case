import * as React from 'react';
import Svg, {SvgProps, G, Circle} from 'react-native-svg';

export const ChartLiveIcon = (props: SvgProps) => (
  <Svg width={32} height={32} viewBox="0 0 32 32" fill="none" {...props}>
    <G filter="url(#filter0_ddf_266_1214)">
      <Circle cx={16.0063} cy={15.9992} r={4} fill="#FF3A30" />
      <Circle
        cx={16.0063}
        cy={15.9992}
        r={5}
        stroke="#FF3A30"
        strokeOpacity={0.25}
        strokeWidth={2}
      />
      <Circle cx={15.8752} cy={15.8752} r={1.37524} fill="white" />
    </G>
  </Svg>
);
