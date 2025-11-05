
// 时间范围方法: 时间单位为小时, 分析某个币每天当中x小时的时间范围内的收益率情况

import { getKLines } from "./apiService.js";

// 获取小时数
function getHoursAndDate(timestamp) {
  const date = new Date(timestamp);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份补零
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');

  return [hours, `${year}-${month}-${day} ${hours}`];
}

// 将数字格式化为带符号的百分比字符串
function formatAsPercentage(num, decimals = 2) {
  // 基本输入验证
  if (typeof num !== 'number' || isNaN(num)) {
    return 'Invalid input';
  }

  // 计算百分比值并固定小数位数
  const percentageValue = (num * 100).toFixed(decimals);

  // 判断并添加正负号（正数前加"+"，负数本身带有"-"）
  const sign = num > 0 ? '+' : '';

  return `${sign}${percentageValue}%`;
}

// 比如 interval 为 3, 输出 0点时段-2点时间这3个小时之间的收益率,然后是1点-3点,一直到11点-第二天1点为止
export async function methodTimeInterval(interval, alphaList) {
  for (const alpha of alphaList) {
    console.log(alpha.symbol);
    const kLines = await getKLines(alpha, '1h');
    // 去掉第一个和最后一个数据, 因为这些数据可能不满1小时
    kLines.pop();
    kLines.shift();
    if (kLines.length < interval) {
      return;
    }
    const result = {};
    for (let i = 0; i < kLines.length - interval; i++) {
      const startKLine = kLines[i];
      const endKLine = kLines[i + interval - 1]
      const [hours, startDate] = getHoursAndDate(parseInt(startKLine[0]));
      const [_, endDate] = getHoursAndDate(parseInt(endKLine[6]));
      const startPrice = parseFloat(startKLine[1]);
      const endPrice = parseFloat(endKLine[4]);
      const change = (endPrice - startPrice) / startPrice;
      const changeList = result[hours] || [];
      changeList.push([startDate, change, endDate]);
      result[hours] = changeList;
    }
    // console.log(result);
    // 输出结果
    Object.entries(result).forEach(([key, value]) => {
      const change = value.reduce((acc, item) => acc + item[1], 0);
      const last = value.map(i => formatAsPercentage(i[1])).slice(-7);
      console.log(`开始时间:${key} 收益: ${formatAsPercentage(change)} 最近7天收益: ${last}`);
    }); 
  }
}