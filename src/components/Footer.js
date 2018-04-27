import React from 'react'

export const Footer = () => (
	<div className="mui-container footer">
		<div className="mui-row">
			<div className="mui-col-xs-1">
			</div>
			<div className="mui-col-xs-10">
				<p>This site is a prototype, designed &amp; developed by<br/><a href="https://github.com/gitmihalis">
					<i className="brand-icon github"></i>gitmihalis
					</a>
				</p>
				<img id="xray-brand" src="http://res.cloudinary.com/dattofkud/image/upload/v1524153905/cryptocat/xray-coincroc.png" alt="xray logo"/>
			</div>
			<div className="mui-col-xs-1">
			</div>
		</div>
		<div className="row mui--text-center">
			<p>
				<small>
					Data provided by the <a href='www.coinmarketcap.com'>coinmarketcap.com</a> and <a href="www.cryptocompare.com">cryptocompare.com</a> APIs
				</small>
			</p>
		</div>
	</div>
	)