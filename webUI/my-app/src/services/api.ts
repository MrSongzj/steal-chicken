import axios from 'axios';

export type AlphaTrace = {
  chainId: string;
  contractAddress: string;
};

export type KLineRaw = [
  string, // startTime
  string, // open
  string, // high
  string, // low
  string, // close
  string, // volume
  string  // endTime
];

// 获取所有alpha币
export async function getAlphaTraceList(): Promise<AlphaTrace[]> {
  try {
    const res = await axios.get('https://www.binance.com/bapi/defi/v1/public/alpha-trade/aggTicker24?dataType=aggregate');
    return res.data?.data || [];
  } catch {
    return [];
  }
}

// 获取alpha币的k线数据
export async function getKLines(data: AlphaTrace, interval: string): Promise<KLineRaw[]> {
  try {
    const res = await axios.get(`https://www.binance.com/bapi/defi/v1/public/alpha-trade/agg-klines?chainId=${data.chainId}&interval=${interval}&tokenAddress=${data.contractAddress}&dataType=aggregate`);
    return res.data?.data?.klineInfos || [];
  } catch {
    return [];
  }
}