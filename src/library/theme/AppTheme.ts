import {ColorValue} from 'react-native';

export type ThemeModeType = 'dark';

export type _APPThemeType = {
  mode: ThemeModeType;
  background: ColorValue;
  labels: {
    primary: ColorValue;
    secondary: ColorValue;
    icon: ColorValue;
  };
  input: {
    icon: ColorValue;
    text: ColorValue;
    placeholder: ColorValue;
    background: ColorValue;
  };
  stockItem: {
    background: {
      primary: ColorValue;
      secondary: ColorValue;
    };
    border: ColorValue;
    icon: ColorValue;
  };
  detail: {
    liveText: ColorValue;
    liveIndicator: {
      inner: ColorValue;
      outer: ColorValue;
      stroke: ColorValue;
    };
    percentBadge: {
      positive: {
        background: ColorValue;
        text: ColorValue;
      };
      negative: {
        background: ColorValue;
        text: ColorValue;
      };
    };
  };
  chart: {
    line: ColorValue;
    dashedLine: ColorValue;
    verticalLine: ColorValue;
    point: {
      inner: ColorValue;
      outer: ColorValue;
      shadow: ColorValue;
    };
    touch: {
      inner: ColorValue;
      outer: ColorValue;
    };
  };
  news: {
    border: ColorValue;
    background: ColorValue;
  };
  badge: {
    background: ColorValue;
    text: ColorValue;
  };
  sectionBorder: ColorValue;
};

export type APPThemeType = _APPThemeType & {};
