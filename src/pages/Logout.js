import React from 'react'
import axios from 'axios'
import { baseAPI } from '../utils'
import {Navbar} from '../components/Navbar'
import cookie from 'react-cookies'



const onLogout = (props) => {
  cookie.remove('access_token')
	props.history.push('/')
}

export const Logout = (props) => {
	console.log(props)
	const accessToken = cookie.load('access_token')
	const url = `${baseAPI}/Admins/logout?access_token=${accessToken}`
	axios.post(url)
		.then(res => {
			onLogout(props)
		})
		.catch(err => {
			console.log('error response: ', err)
			props.history.push('/')
			return
		})

	return (
		<div className="mui-container">
			<div className="mui-row logout">
				<div className="mui--text-center">
					<p>Your already logged out...</p>
				</div>
			</div>
		</div>
		)
}
