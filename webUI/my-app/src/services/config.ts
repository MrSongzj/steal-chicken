export type TradingCompetitionInfo = {
  symbol: string; // 交易对符号，如：ALPHAUSDT
  start: string; // 开始时间，格式：YYYY/MM/DD HH
  end: string;   // 结束时间，格式：YYYY/MM/DD HH
  users: number; // 参与用户数
  average: number; // 人均收益，单位：USDT
}

export const tradingCompetitionList: TradingCompetitionInfo[] = [
  {
    symbol: 'GUA',
    start: '2025/12/31 00',
    end: '2026/01/07 00',
    users: 3300,
    average: 260,
  },
  {
    symbol: 'NIGHT',
    start: '2025/12/11 19',
    end: '2025/12/25 19',
    users: 20500,
    average: 1700,
  }
]