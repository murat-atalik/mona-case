import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  ChartDataItem,
  CustomText,
  DetailHeader,
  Divider,
  DividerSmall,
  DividerXLarge,
  Expand,
  NewsCard,
  SafeAreaBottomView,
} from '../components';
import {AppStackParamList} from '../navigation/AppNavigation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  useAppSelector,
  useFetchChart,
  useFetchNews,
  useFetchSnapshot,
} from '../hooks';
import {
  ActivityIndicator,
  FlatList,
  FlatListProps,
  RefreshControl,
  View,
} from 'react-native';
import {
  themeBaseStyleCreate,
  useCustomTheme,
} from '../library/theme/useCustomTheme';
import {NewsItemType} from '../network';
import {InfoIcon} from '../icons';
import {useFocusEffect} from '@react-navigation/native';
import {CustomChart} from '../components';

type DetailsScreenProps = NativeStackScreenProps<AppStackParamList, 'Details'>;

export const DetailsScreen = ({route}: DetailsScreenProps) => {
  const {id} = route.params;
  const stock = useAppSelector(s => s.stockCache?.[id]);
  const {
    error: newsError,
    isInit: newsIsInit,
    isLoading: newsIsLoading,
    result: newsResult,
  } = useAppSelector(s => s.news?.[id]) ?? {};
  const {
    error: chartError,
    isLoading: chartIsLoading,
    result: chartResult,
  } = useAppSelector(s => s.chart?.[id]) ?? {};
  const {isLoading: snapshotIsLoading} =
    useAppSelector(s => s.snapshot?.[id]) ?? {};

  const theme = useCustomTheme();
  const styles = themed_style[theme.mode];
  const [isRefreshing, setIsRefreshing] = useState(false);

  const {fetchNews} = useFetchNews({id});
  const fetchNewsRef = useRef(fetchNews);

  const {fetchChart} = useFetchChart({id});
  const fetchChartRef = useRef(fetchChart);

  const {fetchSnapshot} = useFetchSnapshot({id});
  const fetchSnapshotRef = useRef(fetchSnapshot);

  const handleRefresh = useCallback(async () => {
    if (newsIsLoading) {
      return;
    }
    setIsRefreshing(true);
    try {
      await fetchNewsRef.current();
    } finally {
      setIsRefreshing(false);
    }
  }, [newsIsLoading]);

  const ListFooterResultIndicators = useMemo(() => {
    if (isRefreshing) {
      return <></>;
    }
    if (newsIsLoading && !newsIsInit) {
      return (
        <View>
          <DividerSmall />
          <ActivityIndicator size="large" color={theme.labels.icon} />
        </View>
      );
    }
    if (newsError) {
      return (
        <View>
          <DividerSmall />
          <CustomText
            color={theme.labels.secondary}
            fontSize={16}
            lineHeight={20}
            centerText>
            Bir hata oluştu.
          </CustomText>
        </View>
      );
    }

    if (!newsResult || newsResult?.length === 0) {
      return (
        <View>
          <DividerSmall />
          <CustomText
            color={theme.labels.secondary}
            fontSize={16}
            lineHeight={20}
            centerText>
            Haber bulunamadı. Lütfen tekrar deneyin.
          </CustomText>
        </View>
      );
    }
    return <></>;
  }, [
    isRefreshing,
    newsError,
    newsIsInit,
    newsIsLoading,
    newsResult,
    theme.labels.icon,
    theme.labels.secondary,
  ]);

  const RenderFooter = useMemo(() => {
    return (
      <>
        {ListFooterResultIndicators}
        <DividerXLarge />
        <SafeAreaBottomView />
      </>
    );
  }, [ListFooterResultIndicators]);

  const renderItem = useCallback<
    NonNullable<FlatListProps<NewsItemType>['renderItem']>
  >(
    ({item}) => {
      return <NewsCard {...item} logo={stock?.logo} />;
    },
    [stock?.logo],
  );

  const calculateChartData = useMemo<ChartDataItem[]>(() => {
    return (chartResult ?? []).map(i => {
      return {value: i.c, date: i.d};
    });
  }, [chartResult]);

  const newsDataFetched = useRef(false);
  useFocusEffect(
    useCallback(() => {
      if (!newsIsLoading && !newsDataFetched.current) {
        fetchNewsRef.current();
        newsDataFetched.current = true;
      }
    }, [newsIsLoading]),
  );

  const chartDataFetched = useRef(false);
  useFocusEffect(
    useCallback(() => {
      if (!chartIsLoading && !chartDataFetched.current) {
        fetchChartRef.current();
        chartDataFetched.current = true;
      }
    }, [chartIsLoading]),
  );

  useFocusEffect(
    useCallback(() => {
      return () => {
        chartDataFetched.current = false;
        newsDataFetched.current = false;
      };
    }, []),
  );
  const snapshotDataFetched = useRef(false);

  useFocusEffect(
    useCallback(() => {
      if (!snapshotIsLoading && !snapshotDataFetched.current) {
        fetchSnapshotRef.current();
        snapshotDataFetched.current = true;
      }
    }, [snapshotIsLoading]),
  );

  useEffect(() => {
    if (!snapshotIsLoading && snapshotDataFetched.current) {
      const timeoutId = setTimeout(() => {
        fetchSnapshotRef.current();
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [snapshotIsLoading]);

  return (
    <Expand>
      <DetailHeader title={stock?.code ?? ''} />
      <CustomChart
        id={id}
        data={calculateChartData}
        error={chartError}
        isLoading={chartIsLoading}
      />
      <View style={styles?.newsHeader}>
        <CustomText
          fontSize={16}
          lineHeight={21}
          color={theme.labels.primary}
          fontWeight="700">
          Haberler
        </CustomText>
        <InfoIcon width={18} height={20} color={theme.labels.icon} />
      </View>
      <FlatList
        data={newsResult}
        renderItem={renderItem}
        ListFooterComponent={RenderFooter}
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
        ItemSeparatorComponent={Divider}
        contentContainerStyle={{
          paddingHorizontal: 20,
        }}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            colors={[theme.labels.icon]}
            tintColor={theme.labels.icon}
          />
        }
      />
    </Expand>
  );
};
const themed_style = themeBaseStyleCreate(() => ({
  newsHeader: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    gap: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
}));
