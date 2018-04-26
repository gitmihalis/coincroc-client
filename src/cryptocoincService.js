import axios from 'axios'
import { baseAPI } from './utils'

const FIAT = 'CAD'
/* ---------------------------------------------------------------------------------
fetch the ticker data from coinmarketcap.com, then:
Merge the set with coincroc's set */
export const loadTickerData = (industryElements, skip=0, limit=30) => {
  /* At the moment, coinmarketcap.com Errors on the preflight CORS check when we submit
  the options in a requeset... */
  const options = {
    // method: 'GET',
    // headers: {
    //   'Access-Control-Allow-Origin': '*',
    // },
    url: `https://api.coinmarketcap.com/v1/ticker/?convert=${FIAT}&start=${skip}&limit=${limit}`,
  } 
  return axios.get(options.url)
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
  return axios.get(`${baseAPI}/cryptocurrencies`)
}

/* ---------------------------------------------------------------------------------
Parse the industries from our datasource to be placed onto the table data set */
export const parseIndustries = (cryptoSet) => {
  const industryEls = {}
  for (let crypto of cryptoSet) {
    if (crypto.industries) 
      industryEls[crypto.symbol] = crypto.industries
  }
  return industryEls
}	

