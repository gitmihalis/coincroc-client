import React from 'react'
import ErrorsList from './ErrorsList'

const Error = (props) => {
	return (
		<div className="mui-row">
			<div className="error mui--text-center">
				<h3> ¯\_(ツ)_/¯</h3>
			</div>
			<ErrorsList errors={props.error}/>
		</div>
	)
}

export default Error 