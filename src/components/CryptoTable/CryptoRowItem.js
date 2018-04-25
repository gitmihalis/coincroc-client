import React from 'react'
import { Link } from 'react-router-dom'
import { $round, posNegStyle } from '../../utils'

export const CryptoRowItem = (props) => {
  /* --- ternary operator: industues  --- */
	const industries = props.data.industries ?
	  props.data.industries.map((industry, i) => {
		  return (
        <li className="industry-item" key={industry.id+i}>
          <span className="bullet">♮ </span>{industry.name}
        </li>
      )
	  })
    :
	 <div className="industries-unknown-item"></div>
  /* --- end ternary --- */

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
  	<td className="industry">
      <ul className="mui-list--inline">{industries}</ul>
		</td>
	</tr>
	)
}



