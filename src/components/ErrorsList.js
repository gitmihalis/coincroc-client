import React from 'react'
import propTypes from 'prop-types'

export const ErrorsList = ({errors}) => {
  return (
  	<div className='errors-list blink-me'>
    {Object.keys(errors).map((fieldName, i) => {
      if(errors[fieldName].length > 0){
        return (
          <div>
            <p key={i}>{errors[fieldName]}</p>
            <br/>
          </div>
        )        
      } else {
        return '';
      }
    })}
  </div>
  )
}

// error:
// {…}
// code:
// "LOGIN_FAILED"
// message:
// "login failed"
// name:
// "Error"
// statusCode:
// 401