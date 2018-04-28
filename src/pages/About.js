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
				
					<p>There are thousands of crypto-coins available today, but what do the people and companies behind them do and which ones are worth your investment? It’s the aim of this website to classify every tradable token into their respective industry and expose high level trends within the cryptocurrency sectors.</p>
					<p>Anyone and everyone can create their own crypto asset. This has created a revolution in rasing capital, and a wild west for investors. As consequence, the majority of the <i>tokens</i> trading today will fail to develop their purported product and swallow their value with without anything to show for it. But this is a good thing! Those whom are free to fail, have the opportunity to succeed.</p>
					<p>Which companies warrant a <i>digital asset</i> as a necessity to their sucess? We don't know yet, but I'm very interested in finding out. A lexical analysis (categorization) will aid in determining warranted &amp; popular use-cases for <i>digital assets</i> as well as the inverse. This site will build on the principle that economic markets are not simply put, "a numbers game". It's people who provide <strong>value</strong>. And At present, millions of people are placing it in Crypto.
					</p>

					<br/>
					<div className='mui-row'>
						<div className="mui-col-xs-6"></div>
						<div className="mui-col-xs-6">
							<p>— When in doubt, <i>HODL</i> -</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
)