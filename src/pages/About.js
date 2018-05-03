import React from 'react'
import {Navbar} from '../components/Navbar'
import cookie from 'react-cookies'

const accessToken = cookie.load('access_token')

export const About = () => (
<div>	
	<Navbar isLoggedIn={accessToken}/>
	<div className="mui-container about">
			<div className="mui-row">
				<div className="mui-col-sm-12">
					<h1>About</h1>
				
					<p>There are thousands of exchangable cryptocurrencies today, but what do the people and companies behind them do. Which ones are worth your investment and which are not? It’s the aim of this website to classify every tradable token into their respective industry, exposing high level trends within the cryptocurrency markets.</p>

					<p>Blockchain technology allows anyone to create and distribute their own digital assets. This has created a revolution in funding capital &amp; a wild west for investors. As a consequence, the majority of the <i>tokens</i> trading today will fail to develop their purported product or service &amp; swallow their value without anything to show for it. But this is a good thing! Those whom are free to fail, have the opportunity to succeed.</p>

					<p>As to which companies/entities warrant a <i>digital asset</i> for success, remains to be seen but we're very interested in finding out. Our Sectors Analysis is being developed to determine identifiable trends for profitable <i>digital assets</i> as well as the inverse. In the meantime, don't invest more than you can afford to lose.
					</p>

					<br/>
					<div className='mui-row'>
						<div className="mui-col-xs-6"></div>
						<div className="mui-col-xs-6">
							<p>&mdash; When in doubt, <i>HODL</i> &mdash;</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
)