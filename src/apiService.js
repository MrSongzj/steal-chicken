/*
// 获取alpha币列表
https://www.binance.com/bapi/defi/v1/public/alpha-trade/aggTicker24?dataType=aggregate
res:
{
  "code": "000000",
  "message": null,
  "messageDetail": null,
  "data": [
    {
      "tokenId": "5E6C210DF54A3E538CE07994C8F4F05E",
      "chainId": "CT_784", // 币的类型id
      "chainIconUrl": "https://bin.bnbstatic.com/image/admin_mgs_image_upload/20250303/fcabdbfc-5dce-4836-8398-baabe35c4dd8.png",
      "chainName": "Sui",
      "contractAddress": "0x9f854b3ad20f8161ec0886f15f4a1752bf75d22261556f14cc8d3a1c5d50e529::magma::MAGMA", // 币id
      "name": "Magma Finance", // 币的全称
      "symbol": "MAGMA", // 币的名称
      "iconUrl": "https://bin.bnbstatic.com/images/web3-data/public/token/logos/ae1aa855ee0f49c7b05ec2b9d54daccd.png",
      "price": "0.14509", // 当前价格
      "percentChange24h": "39.19",
      "volume24h": "1441639.91568024",
      "marketCap": "27567100",
      "fdv": "145090000",
      "liquidity": "1257944.3173800001",
      "totalSupply": "1000000000",
      "circulatingSupply": "190000000",
      "holders": "",
      "decimals": 9,
      "listingCex": false,
      "hotTag": true,
      "cexCoinName": "",
      "canTransfer": false,
      "denomination": 1,
      "offline": false,
      "tradeDecimal": 8,
      "alphaId": "ALPHA_498",
      "offsell": false,
      "priceHigh24h": "0.20364",
      "priceLow24h": "0.10421",
      "count24h": "22468",
      "onlineTge": false,
      "onlineAirdrop": true,
      "score": 4310,
      "cexOffDisplay": false,
      "stockState": false,
      "listingTime": 1765879200000,
      "mulPoint": 2,  // 积分倍数
      "bnExclusiveState": false
    }
  ]
}

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

