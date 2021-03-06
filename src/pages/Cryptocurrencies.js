import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import { CryptoTableMenu, CryptoRowItem} from '../components/CryptoTable'
import { loadCryptos, loadTickerData, parseIndustries } from '../services/cryptocurrencyService'
import {Navbar} from '../components/Navbar'
import cookie from 'react-cookies'
import Select from 'react-select'
import 'react-select/dist/react-select.css'

export class Cryptocurrencies extends Component {
		state = {
			SKIP_AMOUNT: 100,
			paginate: {
				start: 0,
				limit: 0
			},
			search: '',
			allCrypto: '',
			selectedCrypto: '',
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

	onSelectionChangeCrypto = (selectedValue) => {
		this.setState({selectedCrypto: selectedValue})
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

		let selectedSymbol = this.state.selectedCrypto ? this.state.selectedCrypto.symbol : ''

		return (
			<div>
				<Navbar isLoggedIn={accessToken}/>
				<div className="mui-container cryptocurrency">
					<div className="mui-row">
					  <div>
							<div id="select-cryptocurrency" className="mui-col-sm-6">
								<label><br/>
									<Select
										value={this.state.selectedCrypto}
										onChange={this.onSelectionChangeCrypto} 
										name="allCrypto"
										options={this.state.allCrypto}
										labelKey="name"
										valueKey="id"
									/>
								</label>
							</div>

							<div className="mui-textfield mui-col-sm-6">
								<div className="button-group">							
									<Link 
										to={`/cryptocurrencies/${selectedSymbol}`}
										className="mui-btn mui-btn--raised mui-col-sm-4">Search</Link>
								</div>
							</div>						
						</div>
					</div>
					<br/>
					<div className="mui-row">
						<div className="mui-col-xs-12">
							<h4>Showing {filteredCryptos.length} tokens in $CAD</h4>	
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
