import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Cryptocurrencies } from '../pages/Cryptocurrencies'
import { Cryptocurrency } from '../pages/Cryptocurrency'
import { AddIndustryToCryptocurrency } from '../pages/AddIndustryToCryptocurrency'
import { Industries } from '../pages/Industries'
import { Industry } from '../pages/Industry'
import { About } from '../pages/About'
import { Login } from '../pages/Login'
import { Logout } from '../pages/Logout'

export const Main = () => (
		<Switch>
			<Route exact path="/" component={Cryptocurrencies}/>
			<Route path="/about" component={About}/>
			<Route path="/industries" component={Industries}/>
			<Route path="/login" component={Login}/>
			<Route path="/logout" component={Logout}/>
			<Route path="/industries/:name" component={Industry}/>
			<Route path="/cryptocurrencies/:symbol" component={Cryptocurrency}/>
			<Route path="/industry-cryptocurrency" component={AddIndustryToCryptocurrency}/>
		</Switch>
)