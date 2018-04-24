import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { baseAPI } from '../utils'


class Industries extends Component{

  constructor(){
    super()
    this.state = {
      industries: [],
    }
  }

  componentWillMount(){
    this.getIndustries()
  }

  getIndustries(limit){
    // TODO convert to CAD
    axios.get(`${baseAPI}/industries?filter[where][depth]=1`)
      .then(res => {
        const sorted = res.data.sort((a, b) => {
          return a.name > b.name ? 1 : -1
        })
        this.setState({ industries: sorted }, () => console.log(this.state))
      })
      .catch( err => console.error(err))
  }

  render(){

    const coinCount = this.state.industries.length
    const industryItems = this.state.industries.map( (industry, i) => {
      return (
      <Link to={`/industries/${industry.name}`} key={industry.id}>
        <div className="mui-panel industry">
            {industry.name}
        </div>
        </Link>
      )
    })

    return (
      <div className="container">

        <div className="card">
          <div className="card-divider">
          <h5>Showing {coinCount} industries</h5>
          </div>
          <div className="">
            {industryItems}
          </div>
        </div>
        
      </div>
    )

  }

}

export default Industries