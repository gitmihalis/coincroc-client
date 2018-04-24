import React, { Component } from 'react'
import axios from 'axios'
import Select from 'react-select'
import cookie from 'react-cookies' 
import 'react-select/dist/react-select.css'
import ErrorsList from '../components/ErrorsList'
import { baseAPI } from '../utils'


class AddIndustryToCryptocurrency extends Component{

	constructor(props) {
		super(props)
		this.state = {
			cryptoOptions: '',
			industryOptions: '',
			selectedCrypto: '',
			selectedIndustry: '',
			accessToken: '',
			errors: ''
		}
	}

	componentWillMount(){
		const accessToken = cookie.load('access_token')
		this.loadCryptocurrencyOptions()
		this.loadIndustryOptions()
		this.setState({accessToken})
	}

	loadIndustryOptions(){
		axios.get(`${baseAPI}/industries?filter[where][depth]=1`)
		.then(response => {
			// include depth for embedding on crytocurrency
			return response.data.map((industry, i) => {
				return industry
			})
    })
    .then(options => {
    	this.setState({ industryOptions: options })
    })
    .then(_=> console.log(JSON.stringify(this.state)))
    .catch(err => console.log(err))
	}

	loadCryptocurrencyOptions(){
		axios.get(`${baseAPI}/cryptocurrencies`)
		.then(response => {
			return response.data.map((crypto, i) => {
				return crypto
			})
    })
    .then(options => {
    	this.setState({ cryptoOptions: options })
    })
    .then(_=> console.log(JSON.stringify(this.state)))
    .catch(err => console.log(err))
	}

	onSelectionChangeCrypto(selectedValue){
		this.setState({
			selectedCrypto: selectedValue
		}, () => {
				console.log('you selected', selectedValue)
		})
	}

	onSelectionChangeIndustry(selectedValue){
		this.setState({
			selectedIndustry: selectedValue
		}, () => {
				console.log('you selected', selectedValue)
		})
	}

	onPair(){
		const { selectedIndustry, selectedCrypto } = this.state
		const existingIndustries = selectedCrypto.industries || []

		const newIndustry = {
			id: selectedIndustry.id,
			depth: selectedIndustry.depth,
			name: selectedIndustry.name
		}

		const patchData = {
			industries: [...existingIndustries, newIndustry]
		}

		console.log('patched Data: ', patchData)
		axios.request({
			url: `${baseAPI}/cryptocurrencies/${selectedCrypto.id}`,
			method: 'patch',
			data: patchData,
			headers: {Authorization: this.state.accessToken}
		})
		.then(res => {
			this.props.history.push('/')
		})
		.catch(err => {
			const response = err.response
			this.setState({errors: response}, () => {
				console.error(this.state.errors)
			})
		})
	}	

	onUnpair(){
		const { selectedIndustry, selectedCrypto } = this.state
		const existingIndustries = selectedCrypto.industries || []
		console.log(`onUnpair, existingIndustries inital value: ${existingIndustries}`)
		for( let i = 0; i < existingIndustries.length; i++) {
			if (existingIndustries[i].id === selectedIndustry.id) {
				console.log('matched ', existingIndustries[i])
				existingIndustries.splice(i, 1)
			}
		}
		const patchData = {
			industries: existingIndustries
		}
		console.log(`onUnpair, existingIndustries post value: ${existingIndustries}`)
		axios.request({
			url: `${baseAPI}/cryptocurrencies/${selectedCrypto.id}`,
			method: 'patch',
			data: patchData,
			headers: {Authorization: this.state.accessToken}
		})
		.then(res => {
			this.props.history.push('/')
		})
		.catch(err => {
			const response = err.response
			this.setState({errors: response}, () => {
				console.error(this.state.errors.data.error.message)
			})
		})
	}	

	scrape() {
		axios.request({
			url: `${baseAPI}/cryptocurrencies/scrapecrypto`,
			method: 'get',
			headers: {Authorization: this.state.accessToken},
		})
		.then(res => {
			alert('scrapping')
		})
		.catch(err => {
			const response = err.response
			this.setState({errors: response}, () => {
				console.error(this.state.errors.data.error.message)
			})
		})
	}


	render(){
		const cryptoOptions = this.state.cryptoOptions || []
		const industryOptions = this.state.industryOptions || []

		return(
		<div className="mui-container">
				<div className="mui-row">
					<div id="select-cryptocurrency" className="mui-col-sm-6">
						<label>Crypto:
							<Select
								value={this.state.selectedCrypto}
								onChange={this.onSelectionChangeCrypto.bind(this)} 
								name="cryptoOption"
								options={cryptoOptions}
								labelKey="name"
								valueKey="id"
							/>
						</label>
					</div>

					<div id="select-industry" className="mui-col-sm-6">
						<label>Industry:
							<Select
								name="industryOption"
								value={this.state.selectedIndustry}
								onChange={this.onSelectionChangeIndustry.bind(this)}
								options={industryOptions}
								labelKey="name"
								valueKey="id"
							/>
						</label>
					</div>
				</div>
				<br />
				<div className="mui-row">
					<div className="button-group">
						<button onClick={this.onUnpair.bind(this)} className="mui-btn alrt mui-col-xs-6">Unpair</button>
						<button onClick={this.onPair.bind(this)} className="mui-btn mui-col-xs-6">Pair</button>
					</div>
				</div>
				<br/>
				<div className="mui-row">
					<div className="button-group">
						<button onClick={this.scrape.bind(this)} className="mui-btn mui-col-xs-12">SCRAPE</button>
					</div>
				</div>
				<ErrorsList errors={this.state.errors}/>
		</div>
		)
	}
}


export default AddIndustryToCryptocurrency