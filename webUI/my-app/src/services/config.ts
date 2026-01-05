export type TradingCompetitionInfo = {
  symbol: string; // 交易对符号，如：ALPHAUSDT
  start: string; // 开始时间，格式：YYYY/MM/DD HH
  end: string;   // 结束时间，格式：YYYY/MM/DD HH
  users: number; // 参与用户数
  total: number; // 奖池总额，单位：USDT
  average: number; // 人均收益，单位：USDT
}

export const tradingCompetitionList: TradingCompetitionInfo[] = [
  {
    symbol: 'NIGHT',
    start: '2025/12/11 19',
    end: '2025/12/25 19',
    users: 20500,
    total: 34850000,
    average: 1700,
  }
]