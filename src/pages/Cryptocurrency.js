import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import Error from '../components/Error'
import { baseAPI } from '../utils'


export default class Cryptocurrency extends Component{
	constructor(props){
		super(props)
		this.state = {
			cryptocurrency: '',
			price: '',
			defaultImg: 'http://res.cloudinary.com/dattofkud/image/upload/v1523815071/cryptocat/deepsea-anglerfish.jpg'
		}
	}

	componentDidMount = () => {
		this.getTickerData('CAD')
		.then(res => {
			const data = res.data
			this.setState({ price: data }, () => console.log(this.state))
    })
    .then(() => {
			this.getCryptocurrency()
    })		
    .catch(err => { console.error(err)})
	}

	getCryptocurrency = () => {
		const symbol = this.props.match.params.symbol
		console.log(`getCryptocurrency ( ${symbol} )`)
		return axios.get(
			`${baseAPI}/cryptocurrencies?filter[where][symbol]=${symbol}`
			)
		.then(res => {
			const data = res.data
			console.log(`crypto currency got res : ${JSON.stringify(res)}`)
			this.setState({ cryptocurrency: data})
    })
	}




	getTickerData = (fiatSym) => {
		const symbol = this.props.match.params.symbol
		return axios.get(`https://min-api.cryptocompare.com/data/price?fsym=${symbol}&tsyms=${fiatSym}`)
	}

	render = () => {
		const cryptocurrency = this.state.cryptocurrency ? this.state.cryptocurrency[0] : ''
		const image = cryptocurrency ? cryptocurrency.image : 'https://cryptocomapre.com' + this.state.defaultImg
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

		if (cryptocurrency) { 
			return(
			<div className="cryptocurrency mui-container">
				<div className="mui-row">
			    <div className="mui-col-sm-4 mui--text-center">
			      <img className="coin-avatar" 
			      		 src={`https://cryptocompare.com${image}`} 
			      		 alt={cryptocurrency.name}
			      />
			      <h1>{cryptocurrency.name}</h1>
		    	</div>
		    	<div className="mui-col-sm-6 mui--text-center">
				    <h2>[ {cryptocurrency.symbol} ]</h2>
	  				<h3 className="left">Price: ${this.state.price.USD}</h3>
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
		)
		} else {
			return (<Error error={this.state.price}/>)
		}
	}
}


