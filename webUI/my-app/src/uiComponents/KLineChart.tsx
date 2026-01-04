import React, { useMemo } from "react";
import ReactECharts from "echarts-for-react";

export type KLineRaw = [
  string, // startTime
  string, // open
  string, // high
  string, // low
  string, // close
  string, // volume
  string  // endTime
];

interface Props {
  klineInfos: KLineRaw[];
  height?: number;
}

const KLineChart: React.FC<Props> = ({
  klineInfos,
  height = 300,
}) => {
  const { categoryData, values } = useMemo(() => {
    const categoryData: string[] = [];
    const values: number[][] = [];

    klineInfos.forEach(item => {
      const [
        startTime,
        open,
        high,
        low,
        close,
      ] = item;

      categoryData.push(
        new Date(Number(startTime)).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );

      values.push([
        Number(open),
        Number(close),
        Number(low),
        Number(high),
      ]);
    });

    return { categoryData, values };
  }, [klineInfos]);

  const option = {
    backgroundColor: "#fff",
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
    },
    grid: {
      left: 10,
      right: 10,
      top: 10,
    //   bottom: 30,
    //   containLabel: true,
    },
    xAxis: {
        // show: false,
      type: "category",
      data: categoryData,
      scale: true,
      boundaryGap: true,
      axisLine: { onZero: false },
      splitLine: { show: false },
    },
    yAxis: {
      scale: true,
      splitLine: {
        lineStyle: { color: "#eee" },
      },
    },
    dataZoom: [
    {
      type: 'inside',
      start: 50,
      end: 100
    },
    // {
    //   show: true,
    //   type: 'slider',
    //   top: '90%',
    //   start: 50,
    //   end: 100
    // }
  ],
    series: [
      {
        type: "candlestick",
        barWidth: '90%',
        data: values,
        itemStyle: {
          color: "#ef5350",       // 涨
          color0: "#26a69a",      // 跌
          borderColor: "#ef5350",
          borderColor0: "#26a69a",
        },
      },
    ],
  };

  return (
    <ReactECharts
      option={option}
      style={{ height }}
      notMerge
      lazyUpdate
    />
  );
};

export default KLineChart;
