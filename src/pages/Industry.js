import React, { Component } from 'react'
import axios from 'axios'
import {IndustryTableMenu} from '../components/IndustryTableMenu'
import {IndustryRowItem} from '../components/IndustryRowItem'
import { baseAPI } from '../utils'
import {Navbar} from '../components/Navbar'
import cookie from 'react-cookies'


export class Industry extends Component{

	constructor(props){
		super(props)
		this.state = {
			accessToken: '',
			isLoaded: 'false',
			cryptocurrencies: '',
			tickerData: '',
			industries: '',
			tableSortDirection: {
				'price_cad': '',
				'name': '',
				'symbol': '',
				'percent_change_24h': ''
			}
		}
	}
	componentWillMount(){
		const accessToken = cookie.load('access_token')
		this.setState({accessToken})
	}
	componentDidMount(){
		this.fetchCryptocurrencies()
			.then((res) => {
				const data = res.data
				this.setState({ 
					cryptocurrencies: data 
				}, () => { 
					console.log('finished fetchCryptocurrencies()', this.state) 
				})
			})
			.then(() => {
				this.fetchTickerData()
			})
			.catch(err => console.error(err))
	}

	fetchCryptocurrencies = () => {
		const industryName = (this.props.match.params.name)
			.replace(' ', '+')
		console.log(industryName)
		const res = axios.get(
			`${baseAPI}/cryptocurrencies?filter[where][industries.name]=${industryName}`
		)
		return res
	}


	fetchTickerData = async () => {
		const cryptos = this.state.cryptocurrencies

		for (let crypto of cryptos) {
			let query = crypto.name.replace(' ', '-').toLowerCase(); 			console.log('fetching /ticker/' + query)
			const res = await axios.get(`https://api.coinmarketcap.com/v1/ticker/${query}/`)
			const tickerData = this.state.tickerData
			this.setState({tickerData: [...tickerData, res.data[0]]})
		}
	}

	sortNumeric = (key) => {
		const tableSortDirection = this.state.tableSortDirection
		const cryptoTableData = this.state.tickerData
		if (!cryptoTableData) return
		this.setState({
			tickerData: cryptoTableData.sort((a, b) => {
				return tableSortDirection[key] === 'asc'
				? parseFloat(a[key]) - parseFloat(b[key])
				: parseFloat(b[key]) - parseFloat(a[key])
			}),
			tableSortDirection: {
				[key]: tableSortDirection[key] === 'asc'
				? 'desc'
				: 'asc'
			} 
		}) 
	}

	sortAlpha = (key) => {
		const tableSortDirection = this.state.tableSortDirection
		const cryptoTableData = this.state.tickerData
		if (!cryptoTableData) return
		this.setState({
			tickerData: cryptoTableData.sort( (a, b) => {
				if (tableSortDirection[key] === 'asc') {
					return (a[key]).toUpperCase() < (b[key]).toUpperCase() ? 1 : -1
				} else {
					return (b[key]).toUpperCase() < (a[key]).toUpperCase() ? 1 : -1
				}
			}),
			tableSortDirection: {
				[key]: tableSortDirection[key] === 'asc'
				? 'desc'
				: 'asc'
			} 			
		})
	}	

	render(){
		const tickerData = this.state.tickerData || []
		console.log('tickerData = ', tickerData)
		const rowItems = tickerData.map( crypto => {
			return (
				<IndustryRowItem key={crypto.id} data={crypto} />
			)
		})

		return (
			<div className="industry">
				<Navbar isLoggedIn={this.state.accessToken}/>
				<div className="mui-container">
					<div className="mui-row industry">
						<hr/>
						<h5>Showing {this.state.tickerData.length} {this.props.match.params.name} cryptocurrencies</h5>
						<table className="mui-table mui-table--bordered" id="table">
							<IndustryTableMenu sortNumeric={this.sortNumeric} sortAlpha={this.sortAlpha} />
							<tbody>
							{rowItems}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		)
	}
}
