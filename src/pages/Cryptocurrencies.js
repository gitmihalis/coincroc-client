import React, { Component } from 'react'
import axios from 'axios'
import { CryptoTableMenu, CryptoRowItem} from '../components/CryptoTable'
import { baseAPI } from '../utils'

const SKIP_AMOUNT = 30

export class Cryptocurrencies extends Component {
		state = {
			paginate: {
				start: 0,
				limit: 0
			},
			cryptoData: '',
			tickerData: '',
			cryptoTableData: '',
			industries: '',
			tableSortDirection: {
				'price_usd': '',
				'name': '',
				'symbol': '',
				'percent_change_24h': ''
			}
		}

	componentDidMount() {
		this.fetchCryptoData()
	}

	fetchCryptoData = () => {
		axios.get(`${baseAPI}/cryptocurrencies`)
		.then(res => {
			const industryElements = {}
			const data = res.data
			// stip the industries from the crptocurrencies
			data.forEach((crypto) => {
				if (crypto.industries) industryElements[crypto.symbol] = crypto.industries
			})			 
			this.setState({
				industries: industryElements,
				cryptoData: data
			})
			return industryElements
		})
		.then((industryElements) => {
			this.fetchTickerData(industryElements)
		})
		.catch((err) => console.error(err));
	}

	/*
	fetchtickerData - Appneds the industries from DS to the API data and sets the state
	with the merged data.  
	*/
	fetchTickerData = (industryElements, skip=0, limit=SKIP_AMOUNT) => { 
		console.log(`https://api.coinmarketcap.com/v1/ticker/?start=${skip}&limit=${limit}`)
		return axios.get(`https://api.coinmarketcap.com/v1/ticker/?start=${skip}&limit=${limit}`)
			.then(res => {
				const data = res.data

				let mergedCryptos = data.map((crypto, i) => {
					if (industryElements[crypto.symbol]) {
						crypto['industries'] = industryElements[crypto.symbol]
					}
					return crypto
				}) 
				this.setState({ 
					tickerData: data,
					cryptoTableData: mergedCryptos 
				}, () => { 
					console.log('finished fetchTickerData()')
					this.forceUpdate()
				})
      })
	}

	sortNumeric = (key) => {
		const tableSortDirection = this.state.tableSortDirection
		const cryptoTableData = this.state.cryptoTableData

		this.setState({
			cryptoTableData: cryptoTableData.sort((a, b) => {
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
		console.log('alphasort( ', key)
		const tableSortDirection = this.state.tableSortDirection
		const cryptoTableData = this.state.cryptoTableData
		this.setState({
			cryptoTableData: cryptoTableData.sort( (a, b) => {
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

	handlePageNext = (e) => {
		console.log('handle next page')
		// which page are we on?
		const currentStart= this.state.paginate.start
		const industries = this.state.industries
		const newStart = currentStart + SKIP_AMOUNT
		this.fetchTickerData(industries, newStart)
		this.setState({
			paginate: {
				start: newStart
			}
		}, console.log(this.state))
		document.documentElement.scrollTop = 0
	}
	handlePagePrev = (e) => {
		console.log('handle prev page')
		// which page are we on?
		const currentStart= this.state.paginate.start
		const industries = this.state.industries
		const newStart = (currentStart - SKIP_AMOUNT < 0) ? 0 : currentStart - SKIP_AMOUNT
		this.fetchTickerData(industries, newStart)
		this.setState({
			paginate: {
				start: newStart
			}
		}, console.log(this.state))
		document.documentElement.scrollTop = 0
	}	





	render(){
		const cryptoTableData = this.state.cryptoTableData || []
		const rowItems = cryptoTableData.map((crypto) => {
			return (<CryptoRowItem 
							 data={crypto}
							 key={crypto.id} />)
		})

		return (
			<div>
				<h5>Showing {cryptoTableData.length} cryptocurrencies</h5>

				<table className="mui-table mui-table--bordered" id="table">
					<CryptoTableMenu sortNumeric={this.sortNumeric} sortAlpha={this.sortAlpha} />
					<tbody>
						{rowItems ? rowItems : 'none'}
					</tbody>
				</table>

				
				<div className="button-group">
				<button 
				className="mui-btn mui-btn--raised mui-col-sm-4"
				onClick={this.handlePagePrev}
				>Prev</button>


				<button 
				className="mui-btn mui-btn--raised mui-col-sm-4"
				onClick={() => { 
					this.fetchTickerData(this.state.industries, 0, 0) 
					document.documentElement.scrollTop = 0
				}}>All</button>

				<button 
				className="mui-btn mui-btn--raised mui-col-sm-4"
				onClick={this.handlePageNext}
				>Next</button>				
				
				</div> 
			</div>
		)
	}
}
