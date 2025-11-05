/*
// 获取alpha币列表
https://www.binance.com/bapi/defi/v1/public/alpha-trade/aggTicker24?dataType=aggregate

// 获取k线信息
// - chainId: 币的类型id
// - tokenAddress: 币id
// - interval: 时间间隔，15m, 1h, 4h, 1d
https://www.binance.com/bapi/defi/v1/public/alpha-trade/agg-klines?chainId=56&interval=1h&tokenAddress=0x84575b87395c970f1f48e87d87a8db36ed653716&dataType=aggregate
res:
{
  "code": "000000",
  "message": null,
  "messageDetail": null,
  "data": {
    "klineInfos": [
      [
        "1760443200000", // 开始日期时间戳
        "0.078216207664238734", // 开始值
        "0.07831105639795069", // 最高值
        "0.07411111", // 最低值
        "0.075846907359439283", // 结束值
        "2485337.84339780324", // 交易量
        "1760446800000" // 结束日期时间戳
      ]
    ]
  }
}
*/

import axios from 'axios';

// 获取所有alpha币
export async function getAlphaTraceList() {
  try {
    const res = await axios.get('https://www.binance.com/bapi/defi/v1/public/alpha-trade/aggTicker24?dataType=aggregate');
    return res.data?.data || [];
  } catch (error) {
    return [];
  }
}

// 获取alpha币的k线数据
export async function getKLines(data, interval) {
  try {
    const res = await axios.get(`https://www.binance.com/bapi/defi/v1/public/alpha-trade/agg-klines?chainId=${data.chainId}&interval=${interval}&tokenAddress=${data.contractAddress}&dataType=aggregate`);
    return res.data?.data?.klineInfos || [];
  } catch (error) {
    return [];
  }
}

