import {Image, View} from 'react-native';
import React, {useMemo} from 'react';
import {CustomText} from '../CustomText';
import {ScrollView} from 'react-native-gesture-handler';
import {
  themeBaseStyleCreate,
  useCustomTheme,
} from '../../library/theme/useCustomTheme';
import {DividerSmall, DividerXSmall} from '../Divider';
import {NewsItemType} from '../../network';
import {extractArrayInfo, formatHeaderSummary, timeAgo} from '../../utils';
import {NewsBadge, NewsStockBadge} from '../badges';

type NewsCardProps = NewsItemType & {
  logo?: string;
};

export const NewsCard = ({
  date,
  header,
  relatedSymbols,
  summary,
  logo,
}: NewsCardProps) => {
  const theme = useCustomTheme();
  const styles = themed_style[theme.mode];

  const formattedSummary = useMemo(
    () => formatHeaderSummary(header, summary),
    [header, summary],
  );

  const RenderBadges = useMemo(() => {
    const {first, second, restLength} = extractArrayInfo(relatedSymbols);
    return (
      <>
        {first ? <NewsStockBadge symbolId={first} /> : <></>}
        {second ? <NewsStockBadge symbolId={second} /> : <></>}
        {restLength > 0 ? <NewsBadge count={restLength} /> : <></>}
      </>
    );
  }, [relatedSymbols]);

  return (
    <View style={styles?.wrapper}>
      <View style={styles?.flex}>
        <View style={styles?.body}>
          <CustomText
            fontSize={13}
            lineHeight={20}
            color={theme.labels.secondary}>
            Haber
          </CustomText>
          <CustomText
            fontSize={10}
            lineHeight={20}
            color={theme.labels.secondary}>
            •
          </CustomText>
          <CustomText
            fontSize={13}
            lineHeight={20}
            color={theme.labels.secondary}>
            {timeAgo(date)}
          </CustomText>
        </View>
        <DividerXSmall />
        <CustomText
          fontSize={16}
          lineHeight={21}
          numberOfLines={3}
          color={theme.labels.primary}>
          {formattedSummary}
        </CustomText>
        <DividerSmall />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          bounces={false}
          contentContainerStyle={styles?.contentContainerStyle}>
          {RenderBadges}
        </ScrollView>
      </View>
      <Image source={{uri: logo}} style={styles?.image} />
    </View>
  );
};

const themed_style = themeBaseStyleCreate(theme => ({
  wrapper: {
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: theme.news.border,
    backgroundColor: theme.news.background,
    padding: 16,
    gap: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  flex: {flex: 1},
  body: {flexDirection: 'row', gap: 5},
  image: {
    width: 90,
    height: 90,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: theme.labels.secondary,
  },
  contentContainerStyle: {gap: 6},
}));
