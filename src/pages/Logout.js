import React from 'react'
import axios from 'axios'
import cookie from 'react-cookies'
import { baseAPI } from '../utils'


const accessToken = cookie.load('access_token')
const url = `${baseAPI}/Admins/logout?access_token=${accessToken}`
const onLogout = () => {
  cookie.remove('access_token', { path: '/' })
  window.location.href = '/'
}

export const Logout = (props) => {
	axios.post(url)
		.then(res => {
			console.log('successfuly logged out: ', res)
		  onLogout(accessToken)
		})
		.catch(err => {
			console.log('error response: ', err)
			return <p>You're still here..?</p>
		})

	return (
		<div className="mui-container">
			<div className="mui--text-center">
				<p>Your already logged out...</p>
			</div>
		</div>
		)
}
