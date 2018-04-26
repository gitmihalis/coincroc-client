import axios from 'axios'
import {baseAPI} from './utils'
/* ---------------------------------------------------------------------------------
fetch the ticker data from coinmarketcap.com, then:
Merge the set with coincroc's set */
export const loadTickerData = (industryElements, skip=0, limit=30) => {
  const options = {
    method: 'GET',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Negotiate',
    },
    url: `https://api.coinmarketcap.com/v1/ticker/?start=${skip}&limit=${limit}`,
  } 
  return axios(options)
    .then(res => {
      const data = res.data
      return data.map((crypto, i) => {
        if (industryElements[crypto.symbol]) {
          crypto['industries'] = industryElements[crypto.symbol]
        }
        return crypto          
      })
    })
}	

/* ---------------------------------------------------------------------------------
Load Cryptocurrencies from the datasource */
export const loadCryptos = () => {
  const options = {
    method: 'GET',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Negotiate',
    },
    url: `${baseAPI}/cryptocurrencies`,
  } 
  return axios(options)
}

export const parseIndustries = (cryptoSet) => {
  const industryEls = {}
  for (let crypto of cryptoSet) {
    if (crypto.industries) 
      industryEls[crypto.symbol] = crypto.industries
  }
  return industryEls
}	

