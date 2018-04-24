import React from 'react'
import './css/errors.css'

const ErrorsList = ({errors}) => {
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

export default ErrorsList