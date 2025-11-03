// import { getAlphaTraceList } from "./apiService.js";

// getAlphaTraceList();

console.log('aaaaa');

import axios from 'axios';

function getAlphaTraceList() {
  axios.get('https://www.binance.com/bapi/defi/v1/public/alpha-trade/aggTicker24?dataType=aggregate')
    .then(response => {
      const data = response.data.data;
      const alphaList = data
      .sort((a, b) => {
        const numberA = parseFloat(a.volume24h) || 0;
        const numberB = parseFloat(b.volume24h) || 0;
        return numberB - numberA;
      })
      .map(item => item.symbol);
      console.log(alphaList);
    })
    .catch(error => {
      console.log('请求出错：', error);
    });
}

getAlphaTraceList();

console.log('bbbb');