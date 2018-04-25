import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Cryptocurrencies } from '../pages/Cryptocurrencies'
import {Cryptocurrency} from '../pages/Cryptocurrency'
import {AddIndustryToCryptocurrency} from '../pages/AddIndustryToCryptocurrency'
import {Industries} from '../pages/Industries'
import {Industry} from '../pages/Industry'
import {About} from '../pages/About'
import {Login} from '../pages/Login'
import {Logout} from '../pages/Logout'

export const Main = () => (
	<Router>
		<Switch>
			<Route exact path="/" component={Cryptocurrencies}/>
			<Route exact path="/about" component={About}/>
			<Route exact path="/industries" component={Industries}/>
			<Route exact path="/login" component={Login}/>
			<Route exact path="/logout" component={Logout}/>
			<Route exact path="/industries/:name" component={Industry}/>
			<Route exact path="/cryptocurrencies/:symbol" component={Cryptocurrency}/>
			<Route exact path="/industry-cryptocurrency" component={AddIndustryToCryptocurrency}/>
		</Switch>
	</Router>
)