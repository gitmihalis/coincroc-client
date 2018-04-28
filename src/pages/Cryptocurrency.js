import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {Error} from '../components/Error'
import {Notice}  from '../components/Notice'
import {loadDetails} from '../services/cryptocurrencyService'
import axios from 'axios'
import cookie from 'react-cookies'
import {Navbar} from '../components/Navbar'
import { FourOhFour } from './FourOhFour';

export class Cryptocurrency extends Component{
	constructor(props){
		super(props)
		this.state = {
			cryptocurrency: '',
			price: '',
			errorMessage: '',
			message: '',
		}
	}

	componentDidMount = () => {
		this.fetchCurrentPrice('CAD')
		.then(res => {
			const data = res.data
			this.setState({ price: data, message: 'loading...' })
		})
		.then(_ => {
			this.clearMsg()
		})
		.catch(err => { 
			this.setState({errorMessage: err.message})
		})
		
		loadDetails(this.props.match.params.symbol)
			.then(res => {
				const details = res.data
				this.setState({ cryptocurrency: details})
			})
			.then(_ => {
				this.clearMsg()
			})
    	.catch(err => { 
				this.setState({errorMessage: err.message})
			})
	}

	/* ----------------------------------------------------------------------------------
	Load a single price */
	fetchCurrentPrice = (fiatSym) => {
		/* The coinmarketcap datasource and the cryptocompare datasource have different symbols for NANO. The
		quick fix is to swap it. */
		let tokenSymbol = (this.props.match.params.symbol === 'NANO') ?	'XRB' : this.props.match.params.symbol
		return axios.get(`https://min-api.cryptocompare.com/data/price?fsym=${tokenSymbol}&tsyms=${fiatSym}`)
	}	

	clearMsg = () => {
		this.setState({
			errorMessage: '',
			message: '',
		})
	}	

	render = () => {
		const accessToken = cookie.load('access_token')
		// const cryptocurrency = this.state.cryptocurrency ? this.state.cryptocurrency[0] : ''
		const cryptocurrency = this.state.cryptocurrency[0]
		if(!cryptocurrency) return <FourOhFour/>
		const image = cryptocurrency ? cryptocurrency.image : this.state.defaultImg
		let industryList = []
		if (cryptocurrency && cryptocurrency.industries) {
			industryList = cryptocurrency.industries.map((industry) => {
				return (
	        <li className="industry"
	        key={industry.id}>
	          <Link to={`/industries/${industry.name}`}>
	            {industry.name}
	          </Link>
	        </li>)
			}) 
		}

			return(
			<div>
				<Navbar isLoggedIn={accessToken}/>
				<div className="mui-container cyptocurrency">
					<div className="mui-row">
						<div className="mui-col-sm-4 mui--text-center">
							<img className="coin-avatar" 
									src={`https://cryptocompare.com${image}`} 
									alt={cryptocurrency.name}
							/>
							<h1>{cryptocurrency.name}</h1>
						</div>
						<div className="mui-col-sm-6 mui--text-center">
							<h2>[<span>{cryptocurrency.symbol}</span>]</h2>
							<h3 className="left">Price: ${this.state.price.CAD}</h3>
							<ul className="mui-list--inline industryList">
								{industryList}
							</ul>
						</div>
					</div>
					
					<div className="mui-row">
							<div className="description">
								<p>{cryptocurrency.fullDesc}</p>
							</div>
							<div className="expanded button-group">
								<Link className="mui-btn"
									to="/">Back
								</Link>
							</div>
					</div>
				</div>
					{this.state.errorMessage && <Error msg={this.state.errorMessage} close={this.clearMsg}/>}
					{this.state.message && <Notice msg={this.state.message} close={this.clearMsg}/>}				
			</div>
		)
	}
}


