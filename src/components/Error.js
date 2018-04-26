import React from 'react'

export const Error = (props) => {
	return (
		<div id="error-msg" onClick={props.clearMsg}>
			<div className="error mui--text-center">
				<h3> ¯\_(ツ)_/¯</h3>
				<p>{props.msg}</p>
			</div>
		</div>
	)
}

