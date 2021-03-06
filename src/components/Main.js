import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Cryptocurrencies } from '../pages/Cryptocurrencies'
import { Cryptocurrency } from '../pages/Cryptocurrency'
import { Dashboard } from '../pages/Dashboard'
import { Industries } from '../pages/Industries'
import { Industry } from '../pages/Industry'
import { About } from '../pages/About'
import { Login } from '../pages/Login'
import { Logout } from '../pages/Logout'
import { FourOhFour } from '../pages/FourOhFour'

export const Main = () => (
		<Switch>
			<Route exact path="/" component={Cryptocurrencies}/>
			<Route exact path="/cryptocurrencies" component={Cryptocurrencies}/>
			<Route exact path="/about" component={About}/>
			<Route exact path="/industries" component={Industries}/>
			<Route exact path="/login" component={Login}/>
			<Route exact path="/logout" component={Logout}/>
			<Route exact path="/dashboard" component={Dashboard}/>
			<Route path="/industries/:name" component={Industry}/>
			<Route path="/cryptocurrencies/:symbol" component={Cryptocurrency}/>
			<Route path="/:anythingelse" component={FourOhFour}/>
		</Switch>
)