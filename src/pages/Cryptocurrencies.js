import React, { Component } from 'react'
import { CryptoTableMenu, CryptoRowItem} from '../components/CryptoTable'
import { loadCryptos, loadTickerData, parseIndustries } from '../services/cryptocurrencyService'
import {Navbar} from '../components/Navbar'
import cookie from 'react-cookies'

export class Cryptocurrencies extends Component {
		state = {
			SKIP_AMOUNT: 30,
			paginate: {
				start: 0,
				limit: 0
			},
			search: '',
			allCrypto: '',
			cryptoTableData: '',
			industries: '',
			industryMap: '',
			tableSortDirection: {
				'price_cad': '',
				'name': '',
				'symbol': '',
				'percent_change_24h': ''
			}
		}

	componentDidMount() {
		loadCryptos()
			.then(res => {
				const allCrypto = res.data
				const industryMap = parseIndustries(allCrypto)
				this.setState({
					allCrypto,
					industryMap
				})
				return industryMap
			})
			.then(industryMap => {
				return loadTickerData(industryMap)
			})
			.then(data => {
				this.setState({cryptoTableData: data})
			})
	}

	sortNumeric = (key) => {
		if (!this.state.cryptoTableData) return
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
		if (!this.state.cryptoTableData) return		
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

	updateSearch = (e) => {
		const query = e.target.value.substr(0, 20).toLowerCase()
		this.setState({
			search: query
		})
		console.log(query)
	}

	render(){
		const accessToken = cookie.load('access_token')
		const cryptoTableData = this.state.cryptoTableData || []
		const filteredCryptos = cryptoTableData.filter((crypto) => {
			return (
				crypto.name.toLowerCase().indexOf(this.state.search) !== -1 ||
				crypto.symbol.toLowerCase().indexOf(this.state.search) !== -1
			)
		})
		const rowItems = filteredCryptos.map((crypto) => {
			return (<CryptoRowItem 
							 data={crypto}
							 key={crypto.id} />)
		})

		return (
			<div>
				<Navbar isLoggedIn={accessToken}/>
				<div className="mui-container cryptocurrency">
					<div className="mui-row">
						<div className="mui-form--inline">
							<div className="mui-textfield mui-col-sm-6">
								<input type="text"
								value={this.state.query}
								onChange={this.updateSearch}
								placeholder="Search"
								/>
							</div>
							<div className="mui-textfield mui-col-sm-6">
								<div className="button-group">							
									<button id="show-all"
									className="mui-btn mui-btn--raised mui-col-sm-4"
									onClick={() => { 
										loadTickerData(this.state.industryMap, 0, 0).then(pageData => {
											this.setState({
												cryptoTableData: pageData,
												paginate: {
													start: 0
												}
											}, () => document.documentElement.scrollTop = 0)
										})
									}}>SHOW All</button>
								</div>
							</div>						
						</div>
					</div>
					<br/>
					<div className="mui-row">
						<div className="mui-col-xs-12">
							<h4>Showing {filteredCryptos.length} cryptocurrencies</h4>	
						</div>		
					</div>
					<div className="mui-row">	
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
							loadTickerData(this.state.industryMap, 0, 0) 
								.then(pageData => {
									this.setState({
										cryptoTableData: pageData,
										paginate: {
											start: 0
										}
									}, () => document.documentElement.scrollTop = 0)
								})
						}}>All</button>

						<button 
						className="mui-btn mui-btn--raised mui-col-sm-4"
						onClick={() => this.handlePaginate()}
						>Next</button>				
						
						</div> 
					</div>
				</div>
			</div>
		)
	}
}
