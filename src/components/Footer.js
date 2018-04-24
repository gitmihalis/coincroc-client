import React from 'react'
import './css/footer.css'

export default function Footer () {
	return (
		<div className="mui-container footer">
		  <div className="mui-row">
		  	<div className="mui-col-xs-2">
		  	</div>
		    <div className="mui-col-xs-8">
		    	<p>A prototype, designed & developed by<br/><a href="https://github.com/gitmihalis">
		    		<i className="brand-icon github"></i>gitmihalis
		    		</a>
		    	</p>
		    	<img id="xray-brand" src="http://res.cloudinary.com/dattofkud/image/upload/v1524153905/cryptocat/xray-coincroc.png" alt="xray logo"/>
		    </div>
		    <div className="mui-col-xs-2">
		    </div>
		  </div>
		</div>
		)
}