import React from 'react'

export const Notice = (props) => {
	return (
		<div id="notice-msg" onClick={props.close}>
			<div className="error mui--text-center">
				<p>{props.msg} &#x1F44D; </p>
			</div>
		</div>
	)
}

