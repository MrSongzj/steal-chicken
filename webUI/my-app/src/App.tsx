import { useEffect, useState } from "react";
import "./App.css";
import { getAlphaTraceList, getKLines, type KLineRaw } from "./services/api";
import { tradingCompetitionList, type TradingCompetitionInfo } from "./services/config";
import ReactECharts from "echarts-for-react";

// const response = {
//   data: {
//     klineInfos: [
//       ["1760400000000", "0.0780", "0.0786", "0.0774", "0.0783", "1854321", "1760403600000"],
//       ["1760403600000", "0.0783", "0.0789", "0.0778", "0.0780", "1923344", "1760407200000"],
//       ["1760407200000", "0.0780", "0.0784", "0.0772", "0.0776", "2012345", "1760410800000"],
//       ["1760410800000", "0.0776", "0.0781", "0.0769", "0.0779", "2234567", "1760414400000"],
//       ["1760414400000", "0.0779", "0.0788", "0.0775", "0.0785", "2319988", "1760418000000"],
//     ],
//   },
// };

export const response = {
  code: "000000",
  message: null,
  messageDetail: null,
  data: {
    klineInfos: [
      ["1760400000000","0.0780","0.0786","0.0774","0.0783","1854321","1760403600000"],
      ["1760403600000","0.0783","0.0789","0.0778","0.0780","1923344","1760407200000"],
      ["1760407200000","0.0780","0.0784","0.0772","0.0776","2012345","1760410800000"],
      ["1760410800000","0.0776","0.0781","0.0769","0.0779","2234567","1760414400000"],
      ["1760414400000","0.0779","0.0788","0.0775","0.0785","2319988","1760418000000"],

      // 小幅上涨
      ["1760418000000","0.0785","0.0793","0.0781","0.0790","2451234","1760421600000"],
      ["1760421600000","0.0790","0.0798","0.0786","0.0795","2598876","1760425200000"],
      ["1760425200000","0.0795","0.0799","0.0789","0.0792","2689012","1760428800000"],

      // 回调
      ["1760428800000","0.0792","0.0796","0.0783","0.0787","2754432","1760432400000"],
      ["1760432400000","0.0787","0.0790","0.0780","0.0782","2812344","1760436000000"],

      // 横盘震荡
      ["1760436000000","0.0782","0.0789","0.0779","0.0786","2945567","1760439600000"],
      ["1760439600000","0.0786","0.0791","0.0782","0.0784","3056678","1760443200000"],
      ["1760443200000","0.0784","0.0790","0.0781","0.0789","3189987","1760446800000"],

      // 放量上涨
      ["1760446800000","0.0789","0.0800","0.0787","0.0797","3298876","1760450400000"],
      ["1760450400000","0.0797","0.0806","0.0792","0.0803","3412345","1760454000000"],

      // 冲高回落（假突破）
      ["1760454000000","0.0803","0.0812","0.0798","0.0800","3556789","1760457600000"],
      ["1760457600000","0.0800","0.0804","0.0791","0.0794","3667890","1760461200000"],

      // 再次下探
      ["1760461200000","0.0794","0.0799","0.0786","0.0789","3789012","1760464800000"],
      ["1760464800000","0.0789","0.0793","0.0781","0.0784","3891234","1760468400000"],

      // 企稳反弹
      ["1760468400000","0.0784","0.0792","0.0782","0.0789","3998765","1760472000000"],
      ["1760472000000","0.0789","0.0798","0.0786","0.0795","4123456","1760475600000"],

      // 再次震荡
      ["1760475600000","0.0795","0.0799","0.0788","0.0791","4234567","1760479200000"],
      ["1760479200000","0.0791","0.0794","0.0784","0.0787","4356789","1760482800000"],

      // 第二波上涨
      ["1760482800000","0.0787","0.0799","0.0785","0.0796","4467890","1760486400000"],
      ["1760486400000","0.0796","0.0807","0.0792","0.0804","4590123","1760490000000"],
      ["1760490000000","0.0804","0.0812","0.0799","0.0809","4701234","1760493600000"],

      // 高位震荡
      ["1760493600000","0.0809","0.0814","0.0802","0.0806","4823456","1760497200000"],
      ["1760497200000","0.0806","0.0810","0.0798","0.0801","4956789","1760500800000"],

      // 回调
      ["1760500800000","0.0801","0.0804","0.0792","0.0795","5078901","1760504400000"],
      ["1760504400000","0.0795","0.0800","0.0788","0.0790","5190123","1760508000000"],

      // 尾盘反抽
      ["1760508000000","0.0790","0.0798","0.0787","0.0796","5312345","1760511600000"],
      ["1760511600000","0.0796","0.0802","0.0791","0.0800","5445678","1760515200000"],
    ]
  }
};



function App() {

  // const klineInfos = response.data.klineInfos as KLineRaw[];

  const [alphaList, setAlphaList] = useState<string[]>([]);
  const [klineInfos, setKlineInfos] = useState<Record<string, KLineRaw[]>>({});

  useEffect(() => {
    getAlphaTraceList().then(async res => {
      if (res.length > 0) {
        const activityAlphaSymbols = tradingCompetitionList.map(item => item.symbol);
        const alphaList = res.filter(item => activityAlphaSymbols.includes(item.symbol));
        if (alphaList.length > 0) {
          const kLineInfo: Record<string, KLineRaw[]> = {};
          const validAlphaList: string[] = [];
          await Promise.all(
            alphaList.map(async alpha => {
              const r = await getKLines(alpha, '1h');
              if (r.length > 0) {
                kLineInfo[alpha.symbol] = r;
                validAlphaList.push(alpha.symbol);
              }
            })
          );
          setAlphaList([...validAlphaList]);
          setKlineInfos(kLineInfo);
        }
      }
    });
  }, []);

  function getOption(activityInfo: TradingCompetitionInfo, klineInfos: KLineRaw[]) {
    const pages = Math.ceil(klineInfos.length / 24)
    const max = pages * 24;
    const start = 100 - Math.ceil(1 / pages * 100);
    const categoryData: string[] = [];
    const values: number[][] = [];
    let activityStartIndex = -1;
    let activityEndIndex = -1;

    klineInfos.forEach((item, index) => {
      const [
        startTime,
        open,
        high,
        low,
        close,
      ] = item;

      const startDate = new Date(Number(startTime)).toLocaleString(['zh'], {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
      }).slice(0, -4)
      categoryData.push(startDate);

      if (activityInfo.start.slice(0, -3) === startDate.slice(0, -3)) {
        activityStartIndex = index;
      }
      if (activityInfo.end.slice(0, -3) === startDate.slice(0, -3)) {
        activityEndIndex = index;
      }

      console.log('szj', activityInfo.start.slice(0, -3), startDate.slice(0, -3))

      values.push([
        Number((+open).toFixed(5)),
        Number((+close).toFixed(5)),
        Number((+low).toFixed(5)),
        Number((+high).toFixed(5)),
      ]);
    });

    const options: any = {
      backgroundColor: "#fff",
      title: {
        text: activityInfo.symbol,
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
        }
      ],
    };

    if (activityStartIndex !== -1 && activityEndIndex !== -1) {
      // 交易竞赛信息
      options.legend = {
        data: ['交易竞赛'],
        top: 20
      };
      options.series.push(
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
                  coord: [activityStartIndex, Number.MAX_VALUE]
                },
                {
                  coord: [activityEndIndex, 0]
                }
              ]
            ]
          }
        })
    }

    return options;
  }
  
  useEffect(() => {
    console.log('szj222', alphaList);
  }, [alphaList])
    

  return (
    <>
    {alphaList.length > 0 && (
        alphaList.map(item => (
          <div style={{ width: '80vw', backgroundColor: 'red', textAlign: 'left' }}>
            <ReactECharts
              option={getOption(tradingCompetitionList.find(tc => tc.symbol === item) as TradingCompetitionInfo, klineInfos[item])}
              style={{ height: 400 }}
              notMerge
              lazyUpdate
            />
          </div>
        ))
      )
      }
    </>
  );
}

export default App;
