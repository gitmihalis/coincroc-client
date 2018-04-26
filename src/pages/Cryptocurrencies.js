import React, { Component } from 'react'
import { CryptoTableMenu, CryptoRowItem} from '../components/CryptoTable'
import { loadCryptos, loadTickerData, parseIndustries } from '../cryptocoincService'

export class Cryptocurrencies extends Component {
		state = {
			SKIP_AMOUNT: 30,
			paginate: {
				start: 0,
				limit: 0
			},
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
		loadCryptos()
			.then(res => {
				return parseIndustries(res.data)
			})
			.then(industryEls => {
				const industries = industryEls
				this.setState({industries})
				return industries
			})
			.then(industries => {
				return loadTickerData(industries)
			})
			.then(data => {
				this.setState({cryptoTableData: data})
			})
	}

	sortNumeric = (key) => {
		if (!this.cryptoTableData) return
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
		if (!this.cryptoTableData) return		
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

	handlePaginate = (isPrev) => {
		const currentStart= this.state.paginate.start
		const newStart = (isPrev) ?
			currentStart - this.state.SKIP_AMOUNT : currentStart + this.state.SKIP_AMOUNT
		const industries = this.state.industries

		loadTickerData(industries, newStart)
			.then(pageSet => {
				this.setState({
					cryptoTableData: pageSet,
					paginate: {
						start: newStart
					}
				},() => document.documentElement.scrollTop = 0)
			})
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
				onClick={() => this.handlePaginate(true)}
				>Prev</button>


				<button 
				className="mui-btn mui-btn--raised mui-col-sm-4"
				onClick={() => { 
					this.loadTickerData(this.state.industries, 0, 0) 
					document.documentElement.scrollTop = 0
				}}>All</button>

				<button 
				className="mui-btn mui-btn--raised mui-col-sm-4"
				onClick={() => this.handlePaginate()}
				>Next</button>				
				
				</div> 
			</div>
		)
	}
}
