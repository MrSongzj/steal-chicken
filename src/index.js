import { getAlphaTraceList } from "./apiService.js";
import { methodTimeInterval } from "./methodTimeInterval.js";

// console.log('aaaaa');

// function formatTimestamp(timestamp) {
//   // 注意：如果时间戳是秒级，需要乘以1000转换为毫秒级
//   const date = new Date(timestamp);

//   const year = date.getFullYear();
//   const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份补零
//   const day = String(date.getDate()).padStart(2, '0');
//   const hours = String(date.getHours()).padStart(2, '0');
//   const minutes = String(date.getMinutes()).padStart(2, '0');
//   const seconds = String(date.getSeconds()).padStart(2, '0');

//   return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
// }

async function main() {
  // [1] 筛选出要分析的币
  const list = await getAlphaTraceList();
  // 根据交易量由大到小排序, 去前 30 名
  const filterList = list.sort((a, b) => {
    const numberA = parseFloat(a.volume24h) || 0;
    const numberB = parseFloat(b.volume24h) || 0;
    return numberB - numberA;
  })
  .slice(0, 1);
  // [2] 分析方式
  await methodTimeInterval(3, filterList);
}

main();


// console.log(formatTimestamp(1760446800000));
// console.log(formatTimestamp(1760450400000));


// import axios from 'axios';

// function getAlphaTraceList() {
//   axios.get('https://www.binance.com/bapi/defi/v1/public/alpha-trade/aggTicker24?dataType=aggregate')
//     .then(response => {
//       const data = response.data.data;
//       const alphaList = data
//       .sort((a, b) => {
        // const numberA = parseFloat(a.volume24h) || 0;
        // const numberB = parseFloat(b.volume24h) || 0;
        // return numberB - numberA;
//       })
//       // .map(item => item.symbol);
//       console.log(alphaList.slice(0, 10));
//     })
//     .catch(error => {
//       console.log('请求出错：', error);
//     });
// }

// getAlphaTraceList();

// console.log('bbbb');