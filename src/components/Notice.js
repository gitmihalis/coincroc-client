import React from 'react'

export const Notice = (props) => {
	return (
		<div id="notice-msg" onClick={props.close}>
			<div className="error mui--text-center">
				<p>{props.msg} <span role="img" aria-label="thumb-up">&#x1F44D;</span> </p>
			</div>
		</div>
	)
}

