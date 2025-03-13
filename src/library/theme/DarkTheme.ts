import {APPThemeType, _APPThemeType} from './AppTheme';

const _DarkTheme: _APPThemeType = {
  mode: 'dark',
  background: '#000000',
  labels: {
    primary: '#FFFFFF',
    secondary: '#717176',
    icon: '#717176',
  },
  input: {
    icon: '#717176',
    text: '#717176',
    placeholder: '#717176',
    background: '#2C2C2C',
  },
  stockItem: {
    background: {
      primary: '#000000',
      secondary: '#0F0F0F',
    },
    border: '#2C2C2C',
    icon: '#717176',
  },
  detail: {
    liveText: '#FF3A30',
    liveIndicator: {
      inner: '#FF3A30',
      outer: 'rgba(255,58,48,0.4)',
      stroke: 'rgba(255,58,48,0.1)',
    },
    percentBadge: {
      positive: {
        background: '#1A0100',
        text: '#FF3A30',
      },
      negative: {
        background: '#1A0100',
        text: '#FF3A30',
      },
    },
  },
  chart: {
    line: '#FF3A30',
    dashedLine: '#3A3A3C',
    verticalLine: '#3A3A3C',
    point: {
      inner: '#ffffff',
      outer: '#FF3A30',
      shadow: 'rgba(255,58,48,0.25)',
    },
    touch: {
      inner: '#000000',
      outer: '#FF3A30',
    },
  },
  news: {
    border: '#2C2C2C',
    background: '#0F0F0F',
  },
  badge: {
    background: '#1B1B1B',
    text: '#ffffff',
  },
  sectionBorder: '#2C2C2C',
};

export const DarkTheme: APPThemeType = {
  ..._DarkTheme,
};
