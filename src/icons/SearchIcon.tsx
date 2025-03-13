import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export const SearchIcon = (props: SvgProps) => (
  <Svg
    width={17}
    height={16}
    viewBox="0 0 17 16"
    color="#EBEBF5"
    fill="currentColor"
    {...props}>
    <Path d="M.797 6.438q0-1.313.492-2.461a6.5 6.5 0 0 1 1.375-2.032A6.24 6.24 0 0 1 7.156.078 6.2 6.2 0 0 1 9.625.57q1.156.493 2.031 1.375a6.4 6.4 0 0 1 1.367 2.032q.5 1.148.5 2.46 0 1.032-.32 1.961a6.3 6.3 0 0 1-.867 1.696l3.562 3.578q.164.156.243.367.086.211.086.445 0 .33-.149.594a1.12 1.12 0 0 1-1 .57q-.234 0-.453-.086a1.1 1.1 0 0 1-.383-.25l-3.586-3.585q-.75.5-1.64.789a6.1 6.1 0 0 1-1.86.28 6.2 6.2 0 0 1-2.468-.491 6.4 6.4 0 0 1-2.024-1.367A6.5 6.5 0 0 1 1.29 8.914a6.3 6.3 0 0 1-.492-2.476m1.633 0q0 .984.36 1.843a4.8 4.8 0 0 0 1.015 1.5q.656.649 1.515 1.024a4.6 4.6 0 0 0 1.836.367q.985 0 1.836-.367A4.9 4.9 0 0 0 10.5 9.78q.648-.648 1.016-1.5a4.6 4.6 0 0 0 .375-1.844 4.5 4.5 0 0 0-.375-1.835A4.8 4.8 0 0 0 10.5 3.094a4.6 4.6 0 0 0-1.508-1.016 4.6 4.6 0 0 0-1.836-.367q-.976 0-1.836.367a4.7 4.7 0 0 0-1.515 1.016 4.8 4.8 0 0 0-1.016 1.508 4.7 4.7 0 0 0-.36 1.835" />
  </Svg>
);
