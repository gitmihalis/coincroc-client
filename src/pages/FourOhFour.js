import React from 'react'
import {Navbar} from '../components/Navbar'
import cookie from 'react-cookies'
const accessToken = cookie.load('access_token')

export const FourOhFour = (props) => (
	<div className="four-oh-four">
		<Navbar isLoggedIn={accessToken}/>
		<div className="mui-container">
			<div className="mui-row">
				<div className="mui--text-display2 mui--text-center">
					<div className="mui-col-sm-12">
						<p>Sorry, that page could not be found.</p>
						<h1>404</h1>
					</div>
				</div>
			<br/>
			</div>
			<br/>
			<div className='mui-row'>
				<div className="mui-col-sm-12">
					<p>— When in doubt, <i>HODL</i> -</p>
				</div>
			</div>
		</div>
	</div>
)