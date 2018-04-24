import React from 'react'
import { Link } from 'react-router-dom'
import { $round, posNegStyle } from '../utils'
import './css/cryptocurrency.css'

/* 
must return:
  <tr>
    <td>Cell 1-1</td>
    <td>Cell 1-2</td>
  </tr> 
 */

const IndustryRowItem = (props) => {

  return (
  <tr className="crypto-row"> 
    <td className="currency-name">    
      <Link to={`/cryptocurrencies/${props.data.symbol}`}>    
        <span >{props.data.name}</span>
      </Link>
    </td>
    <td className="currency-sybmbol">
      <span>{props.data.symbol}</span>
    </td>
    <td className="price-usd">
      <span>${$round(props.data['price_usd'])}</span>
    </td>       
    <td className="percent-change" >
      <span style={posNegStyle(props.data['percent_change_24h'])}>
      {props.data['percent_change_24h'] + '%'}
      </span>
    </td>
  </tr>
  )
}

export default IndustryRowItem



