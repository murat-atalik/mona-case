import React, {useMemo, useCallback, useRef, useEffect} from 'react';
import {
  ActivityIndicator,
  View,
  ViewStyle,
  useWindowDimensions,
} from 'react-native';
import {ruleTypes} from 'gifted-charts-core';
import {LineChart} from 'react-native-gifted-charts';
import {formatTimestampToTime} from '../../utils';
import {CustomText, Divider, StockCard} from '..';
import {
  themeBaseStyleCreate,
  useCustomTheme,
} from '../../library/theme/useCustomTheme';
import {ChartLiveIcon} from '../../icons';
import {standartComponentMemoiser} from '../../library/componentMemoiser';
import {useAppDispatch} from '../../hooks';
import {chartGraphSlicerActions} from '../../store/slicers';

const PointerComponent = ({style}: {style?: ViewStyle}) => (
  <View style={style} />
);
export type ChartDataItem = {
  value: number;
  date: number;
};

type CustomChartProps = {
  data: ChartDataItem[];
  isLoading?: boolean;
  error?: any;
  id: string;
};

export const CustomChart = standartComponentMemoiser(
  (props: CustomChartProps) => {
    const {data, id, error, isLoading} = props;

    const theme = useCustomTheme();
    const styles = useMemo(() => themed_style[theme.mode], [theme.mode]);
    const {width} = useWindowDimensions();
    const moveRef = useRef(false);
    const dispatch = useAppDispatch();

    const spacing = useMemo(() => {
      return (width * 0.75) / (data.length ?? 1);
    }, [data.length, width]);

    const renderCustomDataPoint = useCallback(
      (_: any, index: number) => {
        if (index === data.length - 1) {
          return <ChartLiveIcon width={32} height={32} />;
        }
        return null;
      },
      [data],
    );

    const onPointData = useCallback(
      (d?: ChartDataItem) => {
        dispatch(chartGraphSlicerActions.set_chart_graph({data: d}));
      },
      [dispatch],
    );

    const onPointDataConditional = useCallback(
      (d?: ChartDataItem) => {
        if (moveRef.current) {
          dispatch(chartGraphSlicerActions.set_chart_graph({data: d}));
        }
      },
      [dispatch],
    );

    const renderPointerLabel = useCallback(
      (items: ChartDataItem[]) => (
        <PointerLabelComponent
          items={items}
          onPointData={onPointDataConditional}
          styles={styles}
          theme={theme}
        />
      ),
      [onPointDataConditional, styles, theme],
    );

    const pointerComponent = useCallback(() => {
      return <PointerComponent style={styles?.pointerComponentsStyle} />;
    }, [styles?.pointerComponentsStyle]);

    const pointerConfig = useMemo(() => {
      return {
        pointerStripHeight: 160,
        pointerStripColor: theme.chart.verticalLine,
        pointerStripWidth: 1,
        width: 8,
        height: 8,
        pointerComponent: pointerComponent,
        radius: 6,
        pointerLabelWidth: 100,
        pointerLabelHeight: 90,
        onTouchEnd: () => {
          moveRef.current = false;
          onPointData?.(undefined);
        },
        onTouchStart: () => {
          moveRef.current = true;
        },
        pointerLabelComponent: renderPointerLabel,
      };
    }, [
      onPointData,
      pointerComponent,
      renderPointerLabel,
      theme.chart.verticalLine,
    ]);

    const RenderEmptyViews = useMemo(() => {
      if (isLoading) {
        return (
          <View style={styles?.emptyView}>
            <ActivityIndicator size="large" color={theme.labels.icon} />
          </View>
        );
      }
      if (error) {
        return (
          <View style={styles?.emptyView}>
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
      return (
        <View style={styles?.emptyView}>
          <CustomText
            color={theme.labels.secondary}
            fontSize={16}
            lineHeight={20}
            centerText>
            Grafik bulunamadı.
          </CustomText>
        </View>
      );
    }, [
      error,
      isLoading,
      styles?.emptyView,
      theme.labels.icon,
      theme.labels.secondary,
    ]);

    return (
      <>
        <StockCard id={id} />
        <View style={styles?.wrapper}>
          <Divider multiplayer={5} />
          {data.length < 1 ? (
            RenderEmptyViews
          ) : (
            <LineChart
              xAxisLabelsHeight={0}
              xAxisLabelTextStyle={styles?.xAxisLabelTextStyle}
              xAxisIndicesHeight={0}
              data={data}
              width={width}
              dataPointsHeight={32}
              dataPointsWidth={32}
              customDataPoint={renderCustomDataPoint}
              spacing={spacing}
              yAxisLabelContainerStyle={styles?.yAxisLabelContainerStyle}
              color={theme.chart.line as string}
              thickness={2}
              initialSpacing={15}
              height={160}
              rulesType={ruleTypes.DASHED}
              noOfSections={6}
              rulesConfigArray={[
                {rulesColor: 'transparent'},
                {rulesColor: 'transparent'},
                {rulesColor: 'transparent'},
                {rulesColor: 'transparent'},
                {
                  rulesColor: theme.chart.dashedLine,
                  dashGap: 5,
                  dashWidth: 5,
                  rulesThickness: 2,
                  rulesType: ruleTypes.DASHED,
                },
                {rulesColor: 'transparent'},
              ]}
              hideYAxisText
              backgroundColor={theme.background}
              xAxisType={ruleTypes.DASHED}
              overflowTop={20}
              pointerConfig={pointerConfig}
            />
          )}
        </View>
      </>
    );
  },
);

type PointerLabelProps = {
  items: ChartDataItem[];
  onPointData: (data?: ChartDataItem) => void;
  styles: any;
  theme: any;
};

const PointerLabelComponent = (props: PointerLabelProps) => {
  const {items, onPointData, styles, theme} = props;
  useEffect(() => {
    onPointData(items[0]);
  }, [items, onPointData]);

  return (
    <View style={styles?.labelWrapper}>
      <CustomText
        centerText
        fontSize={12}
        lineHeight={16}
        fontWeight="500"
        color={theme.labels.primary}>
        {formatTimestampToTime(items[0].date)}
      </CustomText>
    </View>
  );
};

const themed_style = themeBaseStyleCreate(theme => ({
  wrapper: {
    height: 200,
  },
  xAxisLabelTextStyle: {display: 'none'},
  yAxisLabelContainerStyle: {
    width: 0,
  },
  pointerComponentsStyle: {
    backgroundColor: theme.chart.touch.inner,
    width: 8,
    height: 8,
    borderRadius: 5,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: theme.chart.touch.outer,
    marginLeft: 2,
    marginTop: 3,
  },
  labelWrapper: {
    height: 20,
    width: 100,
    justifyContent: 'center',
    marginTop: 30,
    marginLeft: -38,
  },
  emptyView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
