import React, { Component } from 'react'
import axios from 'axios'
import cookie from 'react-cookies'
import {Error} from '../components/Error'
import {Navbar} from '../components/Navbar'
import { baseAPI } from '../utils'

export class Login extends Component {
	constructor(props) {
		super(props)
		this.state = {
			email: '',
			password: '',
			accessToken: '',
			errorMessage: '',
			message: '',
		}
	}

  componentWillMount = () => {
		// if access token is present, log the user out...
		if (cookie.load('access_token')) {
			cookie.remove('access_token')
		}
	}	
	
	clearMsg = () => {
		this.setState({
			errorMessage: '',
			message: '',
		})
	}

  handleInputChange = (e) => {
    const target = e.target
    const value = target.value
    const name = target.name

    this.setState({
      [name]: value
    })
	}
	
	handleEmptySubmit = (e) => {
		e.preventDefault()
		this.setState({
			errorMessage: 'Please enter an email and password.'
		})
	}

  handleSubmit = (e) => {
		e.preventDefault()
	 	const url = `${baseAPI}/Admins/login`;
	 	const payload={
	 		"email": this.state.email,
	 		"password": this.state.password
	 	}
	 axios.post(url, payload)
	 	.then(res => {
			 if(res.status === 200){
 				console.log("Login successfull") 
 				this.onLogin(res.data.id)
 				return}

 			 if(res.status === 204) {
 			 	console.log("Username password do not match")
 				alert("username password do not match")
 				return}

			 	console.log("Username does not exists")
				alert("Username does not exist")
 	 })
		.catch(err => {
			const response = err.response
			this.setState({errorMessage: response.data.error.message}, () => console.log(this.state.errorMessage))
		})
 }

 onLogin = (accessToken) => {
  this.setState({ accessToken })
  cookie.save('access_token', accessToken, { path: '/' })
  this.props.history.push('/')
}


	render(){
		const sumbitHandler = (this.state.email && this.state.password ) ?
			this.handleSubmit : this.handleEmptySubmit
		return (
			<div className="login">
			<Navbar isLoggedIn={this.state.accessToken}/>
			<div className="mui-container">
				<div className="mui-row">
				<div className="mui-col-xs-12">
					<h1>Login</h1>
					<small>Well... go ahead and login then.</small>
					<form className="mui-form">
						<legend></legend>
						<div className="mui-textfield">
							<input name="email"
										type="text" 
										placeholder="email"
										onChange={this.handleInputChange} />
						</div>
						<div className="mui-textfield">
							<input name="password"
										type="password" 
										placeholder="password"
										onChange={this.handleInputChange} />
						</div>
						<button type="submit" 
										className="mui-btn mui-btn--raised"
										onClick={sumbitHandler}
						>Submit</button>
					</form>

					{this.state.errorMessage && <Error msg={this.state.errorMessage} close={this.clearMsg}/>}
				</div>
				</div>				
			</div>
		</div>
		)
	}
}

