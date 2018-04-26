import React from 'react'

export const IndustryTableMenu = props => (
  
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
    	<th className="price-cad">
  			<a onClick={() => props.sortNumeric('price_cad')}>
  				Price
  			</a>
    	</th>		    
    	<th className="percent-change">
        <a onClick={() => props.sortNumeric('percent_change_24h')}>
          24hr.change
        </a>
    	</th>
    </tr>
  </thead>
)
