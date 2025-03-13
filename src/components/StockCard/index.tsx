import {ActivityIndicator, View} from 'react-native';
import React, {useMemo} from 'react';
import {CustomText} from '../CustomText';
import {
  themeBaseStyleCreate,
  useCustomTheme,
} from '../../library/theme/useCustomTheme';
import {LiveIcon} from '../../icons';
import {shallowEqual} from 'react-redux';
import {useAppSelector} from '../../hooks';
import {convertDecimal, formatPercentage, formatTimestamp} from '../../utils';

type StockCardProps = {
  id: string;
};

export const StockCard = (props: StockCardProps) => {
  const {id} = props;
  const theme = useCustomTheme();
  const styles = themed_style[theme.mode];
  const {currencyPrefix, decimal} =
    useAppSelector(s => s.stockCache?.[id], shallowEqual) ?? {};
  const {error, isInit, isLoading, result} =
    useAppSelector(s => s.snapshot?.[id], shallowEqual) ?? {};
  const {close, dailyChangePercent, dateTime} = result ?? {};

  const lastPoint = useAppSelector(s => s.chartGraph.lastPoint);

  const calculatedPrice = useMemo(() => {
    return `${currencyPrefix}${convertDecimal(
      lastPoint?.value || close,
      decimal,
    )}`;
  }, [close, currencyPrefix, decimal, lastPoint?.value]);

  const calculateDailyChange = useMemo(() => {
    return formatPercentage(dailyChangePercent);
  }, [dailyChangePercent]);

  const isPercentageNegative = useMemo(() => {
    return (dailyChangePercent ?? 0) < 0 ? true : false;
  }, [dailyChangePercent]);

  const calcDate = useMemo(() => {
    if (!dateTime) {
      return '';
    }
    return formatTimestamp(lastPoint?.date ?? dateTime);
  }, [dateTime, lastPoint?.date]);

  if ((!isLoading && !isInit) || error) {
    return <></>;
  }
  if (isLoading && !isInit) {
    return <ActivityIndicator size="large" color={theme.labels.icon} />;
  }

  return (
    <View style={styles?.wrapper}>
      <View style={styles?.priceWrapper}>
        <CustomText fontWeight="700" lineHeight={34} fontSize={28}>
          {calculatedPrice}
        </CustomText>
        <View style={styles?.badge}>
          <CustomText
            color={
              isPercentageNegative
                ? theme.detail.percentBadge.negative.text
                : theme.detail.percentBadge.positive.text
            }
            fontSize={12}
            lineHeight={16}>
            {calculateDailyChange}
          </CustomText>
        </View>
      </View>
      <View style={styles?.liveWrapper}>
        {lastPoint?.date ? (
          <></>
        ) : (
          <View style={styles?.liveIconWrapper}>
            <LiveIcon
              color1={theme.detail.liveIndicator.stroke}
              color2={theme.detail.liveIndicator.outer}
              color3={theme.detail.liveIndicator.inner}
              width={10}
              height={10}
            />
            <CustomText
              fontSize={12}
              lineHeight={16}
              color={theme.detail.liveText}>
              Canlı
            </CustomText>
          </View>
        )}
        <CustomText
          fontSize={12}
          lineHeight={16}
          color={theme.labels.secondary}>
          ({calcDate})
        </CustomText>
      </View>
    </View>
  );
};

const themed_style = themeBaseStyleCreate(theme => {
  return {
    wrapper: {paddingVertical: 16, paddingHorizontal: 20, gap: 4},
    priceWrapper: {flexDirection: 'row', gap: 8, alignItems: 'center'},
    liveWrapper: {
      height: 16,
      flexDirection: 'row',
      gap: 6,
      alignItems: 'center',
    },
    liveIconWrapper: {flexDirection: 'row', gap: 3, alignItems: 'center'},
    badge: {
      paddingVertical: 2,
      paddingHorizontal: 4,
      borderRadius: 4,
      overflow: 'hidden',
      backgroundColor: theme.detail.percentBadge.positive.background,
    },
  };
});
