import React, { Component } from 'react'
import axios from 'axios'
import Select from 'react-select'
import cookie from 'react-cookies' 
import { loadIndustries, createIndustry, destroyIndustry } from '../services/industryService'
import { loadCryptos } from '../services/cryptocurrencyService'
import { Error } from '../components/Error'
import { Notice } from '../components/Notice'
import { baseAPI } from '../utils'
import 'react-select/dist/react-select.css'
import {Navbar} from '../components/Navbar'


export class Dashboard extends Component{
	constructor(props){
		super(props)
		this.state = {
				cryptoOptions: '',
				industryOptions: '',
				selectedCrypto: '',
				selectedIndustry: '',
				accessToken: '',
				errorMessage: '',
				message: '',
				newIndustry: '',
		}
	}

	componentWillMount() {
				const accessToken = cookie.load('access_token')
				this.setState({accessToken})
	}
	componentDidMount(){
		loadCryptos()
			.then(res => {
				const options = res.data
				this.setState({ cryptoOptions: options })
			})
			.catch(err => {
				const message = err.message
				console.error(err)
				this.setState({errorMessage: message})
			})					

		loadIndustries(1)
			.then(res => {
				const options = res.data
				this.setState({ industryOptions: options })
			})
		.catch(err => {
			const message = err.message
			console.error(err)
			this.setState({errorMessage: message})
		})
	}

	clearMsg = () => {
		this.setState({
			errorMessage: '',
			message: '',
		})
	}	


	onSelectionChangeCrypto = (selectedValue) => {
		this.setState({selectedCrypto: selectedValue})
	}
	onSelectionChangeIndustry = (selectedValue) => {
		this.setState({selectedIndustry: selectedValue})
	}



	onPair = () => {
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

		axios.request({
			url: `${baseAPI}/cryptocurrencies/${selectedCrypto.id}`,
			method: 'patch',
			data: patchData,
			headers: {Authorization: this.state.accessToken}
		})
		.then(res => {
			if ( res.status === 200) this.setState({message: res.statusText})
		})
		.catch(err => {
			const message = err.response.data.error.message
			this.setState({errorMessage: message}, 
			() => console.error(err.response.data))
		})
	}	


	onUnpair = () => {
		const { selectedIndustry, selectedCrypto } = this.state
		const existingIndustries = selectedCrypto.industries || []
		for (let i = 0; i < existingIndustries.length; i++) {
			if (existingIndustries[i].id === selectedIndustry.id) {
				console.log('matched ', existingIndustries[i])
				existingIndustries.splice(i, 1)
			}
		}
		const patchData = {
			industries: existingIndustries
		}
		axios.request({
			url: `${baseAPI}/cryptocurrencies/${selectedCrypto.id}`,
			method: 'patch',
			data: patchData,
			headers: {Authorization: this.state.accessToken}
		})
		.then(res => {
			if ( res.status === 200) this.setState({message: res.statusText})
		})
		.catch(err => {
			const message = err.response.data.error.message
			this.setState({errorMessage: message}, 
			() => console.error(err.response.data))
		})
	}	


	scrape = () => {
		axios.request({
			url: `${baseAPI}/cryptocurrencies/scrapecrypto`,
			method: 'get',
			headers: {Authorization: this.state.accessToken},
		})
		.then(res => {
			alert('scrapping')
		})
		.catch(err => {
			const message = err.response.data.error.message
			this.setState({errorMessage: message}, 
			() => console.error(err.response.data))
		})
	}


	handleIndustryInputChange = (e) => {
		const value = e.target.value
		const newIndustry = value
		this.setState({newIndustry})
	}

	onCreateIndustry = (e) => {
		e.preventDefault()
		if (!this.state.newIndustry) {
			this.setState({message: 'Input a new industry first'})
			return
		}
		const newIndustry = {
			name: this.state.newIndustry,
			depth: 1
		}
		createIndustry(newIndustry)
			.then(res => {
				if (res.status === 200) this.setState({message: 'Industry saved '})
			})
			.catch(err => {
				console.err(err)
				this.setState({errorMessage: err.message})
			})
	}


	onDestroyIndustry = (e) => {
		e.preventDefault()
		if (!this.state.selectedIndustry) {
			this.setState({errorMessage: 'Selected an industry first'})
			return
		}		
		const doomedIndustry = this.state.selectedIndustry
		destroyIndustry(doomedIndustry.id)
			.then(res => {
				if(res.status === 200) this.setState({message: `Removed ${doomedIndustry.name}`})
			})
			.catch(err => {
				console.log(err)
				this.setState({errorMessage: err.message})
			})
	}



	render(){
		const cryptoOptions = this.state.cryptoOptions || []
		const industryOptions = this.state.industryOptions || []
		console.log(this.state.industryOptions)
		return(
		<div className="dashboard">
				<Navbar isLoggedIn={this.state.accessToken}/>
				<div className="mui-container">
					<div className="mui-row">
						<form className="mui-form">
							<div className="mui-textfield">
								<div className="mui-textfield">
									<input name="industry"
										type="text" 
										placeholder="New Industry"
										onChange={this.handleIndustryInputChange} />
								</div>
							</div>
							<button className="mui-btn" onClick={this.onCreateIndustry}>Create</button>
						</form>
					</div>
					<br/>		
					<div className="mui-row">
						<div id="select-cryptocurrency" className="mui-col-sm-6">
							<label>Crypto:
								<Select
									value={this.state.selectedCrypto}
									onChange={this.onSelectionChangeCrypto} 
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
									onChange={this.onSelectionChangeIndustry}
									options={industryOptions}
									labelKey="name"
									valueKey="id"
								/>
							</label>
						</div>
					</div>

					<br/>
					<div className="mui-row">
						<div className="button-group">
							<button onClick={this.onUnpair} className="mui-btn alrt mui-col-xs-4">Unpair</button>
							<button onClick={this.onPair} className="mui-btn mui-col-xs-4">Pair</button>
							<button onClick={this.onDestroyIndustry} className="mui-btn mui-col-xs-4">Delete Industry</button>
						</div>
					</div>
					<br/>
					<div className="mui-row">
						<div className="button-group">
							<button onClick={this.scrape} className="mui-btn mui-col-xs-12">SCRAPE</button>
						</div>
					</div>
					{this.state.errorMessage && <Error msg={this.state.errorMessage} close={this.clearMsg}/>}
					{this.state.message && <Notice msg={this.state.message} close={this.clearMsg}/>}
				</div>
			</div>
		)
	}
}