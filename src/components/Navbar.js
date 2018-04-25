import React from 'react'
import { BrowserRouter as Router, Link } from 'react-router-dom'
import './css/navbar.css'
import cookie from 'react-cookies' 

export default function Navbar (props) {

  const accessToken = cookie.load('access_token')

	// render(){
		return (
      <div className="nav-wrapper">
        <nav className='greedy' id="page-top">
          <h1>
          <img src="http://res.cloudinary.com/dattofkud/image/upload/v1524096719/cryptocat/cryptocroc/coincroc-brand.png"
               alt="coincroc-brandb" />
          </h1>
          <Router>
            <ul className='links'>
              <li><Link to="/">Cryptocurrencies</Link></li>
              <li><Link to="/industries">Industries</Link></li>
              {(!!accessToken) ? 
                <li><Link to="/industry-cryptocurrency">Pair Industries</Link></li> :
                null
              }
              <li><Link to="/about">About</Link></li>
            </ul>
          </Router>
          <button>MENU</button>
          <ul className='hidden-links hidden'></ul>
        </nav>
      </div>
		)
}




