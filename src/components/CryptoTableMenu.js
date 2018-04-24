import React from 'react'
import './css/cryptocurrency.css'

const CryptoTableMenu = props => (
  
	<thead>
    <tr>
      <th className="currency-name">
        <a onClick={() => props.sortAlpha('name')}>
          Name
        </a>
      </th>
      <th className="currency-sybmbol">
        <a onClick={() => props.sortAlpha('symbol')}>
          Symbol
        </a>
      </th>
    	<th className="price-usd">
  			<a onClick={() => props.sortNumeric('price_usd')}>
  				Price
  			</a>
    	</th>		    
    	<th className="percent-change">
        <a onClick={() => props.sortNumeric('percent_change_24h')}>
          24hr.change
        </a>
    	</th>
    	<th className="industry mui--text-right">
        <span>Industry</span>
  	  </th>
    </tr>
  </thead>
)

export default CryptoTableMenu
