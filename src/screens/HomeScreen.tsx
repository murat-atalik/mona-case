import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  View,
  Keyboard,
  FlatListProps,
  ActivityIndicator,
  FlatList,
  RefreshControl,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppStackParamList} from '../navigation/AppNavigation';
import {
  CustomText,
  DividerLarge,
  DividerSmall,
  DividerXLarge,
  Expand,
  HomeHeader,
  HomeStockListHeader,
  Line,
  SafeAreaBottomView,
  SearchInput,
  HomeStockItem,
} from '../components';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {
  themeBaseStyleCreate,
  useCustomTheme,
} from '../library/theme/useCustomTheme';
import {useFetchStockList} from '../hooks';
import {useAppSelector} from '../hooks';
import {shallowEqual} from 'react-redux';
import {StockListItemType} from '../network';
import {useFocusEffect} from '@react-navigation/native';

type HomeScreenProps = NativeStackScreenProps<AppStackParamList, 'Home'>;

export const HomeScreen = ({navigation}: HomeScreenProps) => {
  const theme = useCustomTheme();
  const styles = themed_style[theme.mode];
  const {fetchData} = useFetchStockList();
  const fetchDataRef = useRef(fetchData);
  const dataFetched = useRef(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchText, setSearchText] = useState<string>('');
  const [debouncedSearchText, setDebouncedSearchText] = useState<string>('');

  const {error, isInit, result, isLoading} = useAppSelector(
    s => s.stockList.list,
    shallowEqual,
  );

  const filteredResult = useMemo(() => {
    return (
      result?.filter(
        item =>
          item.desc.toLowerCase().includes(debouncedSearchText.toLowerCase()) ||
          item.code.toLowerCase().includes(debouncedSearchText.toLowerCase()),
      ) ?? []
    );
  }, [result, debouncedSearchText]);

  const navigateToDetail = useCallback(
    (id: string) => {
      navigation.navigate('Details', {id: id});
    },
    [navigation],
  );

  const renderItem = useCallback<
    NonNullable<FlatListProps<StockListItemType>['renderItem']>
  >(
    ({item, index}) => {
      return (
        <HomeStockItem
          id={item.id}
          transparent={index % 2 === 0}
          onPress={() => navigateToDetail(item.id)}
        />
      );
    },
    [navigateToDetail],
  );

  const tapGesture = Gesture.Tap().onEnd(() => {
    Keyboard.dismiss();
  });

  const handleRefresh = useCallback(async () => {
    if (isLoading) {
      return;
    }
    setIsRefreshing(true);
    try {
      await fetchDataRef.current();
    } finally {
      setIsRefreshing(false);
    }
  }, [isLoading]);

  const ListFooterResultIndicators = useMemo(() => {
    if (isRefreshing) {
      return <></>;
    }
    if (isLoading && !isInit) {
      return (
        <View>
          <DividerSmall />
          <ActivityIndicator size="large" color={theme.labels.icon} />
        </View>
      );
    }
    if (error) {
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
    if (filteredResult.length === 0 && (result?.length ?? 0) > 0) {
      return (
        <View>
          <DividerSmall />
          <CustomText
            color={theme.labels.secondary}
            fontSize={16}
            lineHeight={20}
            centerText>
            Arama sonucu bulunamadı.
          </CustomText>
        </View>
      );
    }
    if (!result || result?.length === 0) {
      return (
        <View>
          <DividerSmall />
          <CustomText
            color={theme.labels.secondary}
            fontSize={16}
            lineHeight={20}
            centerText>
            Sonuç bulunamadı. Lütfen tekrar deneyin.
          </CustomText>
        </View>
      );
    }
    return <></>;
  }, [
    isRefreshing,
    isLoading,
    isInit,
    error,
    filteredResult.length,
    result,
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

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchText(searchText);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchText]);

  useFocusEffect(
    useCallback(() => {
      if (!isLoading && !dataFetched.current) {
        fetchDataRef.current();
        dataFetched.current = true;
      }
    }, [isLoading]),
  );

  useFocusEffect(
    useCallback(() => {
      return () => {
        dataFetched.current = false;
      };
    }, []),
  );
  return (
    <GestureDetector gesture={tapGesture}>
      <Expand style={styles?.wrapper}>
        <HomeHeader />
        <DividerLarge />
        <SearchInput value={searchText} onChangeText={setSearchText} />
        <DividerLarge />
        <Line />
        <DividerSmall />
        <FlatList
          ListHeaderComponent={
            filteredResult.length > 0 ? <HomeStockListHeader /> : <></>
          }
          keyboardDismissMode="on-drag"
          data={filteredResult}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          ListFooterComponent={RenderFooter}
          refreshing={isRefreshing}
          onRefresh={handleRefresh}
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
    </GestureDetector>
  );
};

const themed_style = themeBaseStyleCreate(theme => {
  return {
    wrapper: {
      backgroundColor: theme.background,
    },
  };
});
