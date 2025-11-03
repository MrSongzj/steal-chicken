/*
// 获取alpha币列表
https://www.binance.com/bapi/defi/v1/public/alpha-trade/aggTicker24?dataType=aggregate

// 获取k线信息
// - chainId: 币的类型id
// - tokenAddress: 币id
// - interval: 时间间隔，15m, 1h, 4h, 1d
https://www.binance.com/bapi/defi/v1/public/alpha-trade/agg-klines?chainId=56&interval=1h&tokenAddress=0x84575b87395c970f1f48e87d87a8db36ed653716&dataType=aggregate
*/

import axios from 'axios';

export function getAlphaTraceList() {
  axios.get('https://www.binance.com/bapi/defi/v1/public/alpha-trade/aggTicker24?dataType=aggregate')
    .then(response => {
      console.log(response.data); // 处理响应数据[citation:1]
    })
    .catch(error => {
      console.error('请求出错：', error); // 处理错误[citation:2]
    });
}

