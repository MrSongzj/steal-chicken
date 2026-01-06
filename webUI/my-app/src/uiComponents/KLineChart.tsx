import React, { useMemo } from "react";
import ReactECharts from "echarts-for-react";
import type { KLineRaw } from "../services/api";

interface Props {
  title: string;
  klineInfos: KLineRaw[];
  height?: number;
}

const KLineChart: React.FC<Props> = ({
  title,
  klineInfos,
  height = 300,
}) => {
  const { categoryData, values, max, start } = useMemo(() => {
    const pages = Math.ceil(klineInfos.length / 24)
    const max = pages * 24;
    const start = Math.ceil(1 / pages * 100);
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
        new Date(Number(startTime)).toLocaleString().slice(0, -6)
      );

      values.push([
        Number((+open).toFixed(5)),
        Number((+close).toFixed(5)),
        Number((+low).toFixed(5)),
        Number((+high).toFixed(5)),
      ]);
    });

    return { categoryData, values, max, start };
  }, [klineInfos]);

  const option = {
    backgroundColor: "#fff",
    title: {
      text: title,
      left: 0,
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
    },
    grid: {
      left: 80,
      right: 50,
      top: 65,
      bottom: 115
    },
    xAxis: {
      type: "category",
      data: categoryData,
      max,
      boundaryGap: true,
      offset: 30,
    },
    yAxis: {
      scale: true,
      offset: 15,
      splitLine: {
        lineStyle: { color: "#eee" },
      },
    },
    dataZoom: [
    {
      type: 'inside',
      start,
      end: 100
    },
    {
      show: true,
      type: 'slider',
      start,
      end: 100
    }
  ],
    legend: {
      data: ['交易竞赛'],
      top: 20
    },
    series: [
      {
        type: "candlestick",
        barWidth: '90%',
        data: values,
        itemStyle: {
          color: "#26a69a",       // 涨
          color0: "#ef5350",      // 跌
          borderColor: "#26a69a",
          borderColor0: "#ef5350",
        },
        markPoint: {
          symbolSize: 0,
          label: {
            color: '#333',
            fontWeight: 'bold',
          },
          data: [
            {
              type: 'max',
              valueDim: 'highest',
              symbolOffset: [0, -10],
            },
            {
              type: 'min',
              valueDim: 'lowest',
              symbolOffset: [0, 10],
            }
          ]
        },
      },
      {
        name: "交易竞赛",
        type: "candlestick",
        markArea: {
          itemStyle: {
            color: 'rgba(255, 0, 0, 0.2)',
          },
          data: [
            [
              {
                coord: [0, Number.MAX_VALUE]
              },
              {
                coord: [43, 0]
              }
            ]
          ]
        }
      }
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
