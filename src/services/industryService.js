import axios from 'axios'
import {baseAPI} from '../utils'
import cookie from 'react-cookies' 



export const loadIndustries = (depth) => {
  return axios.get(`${baseAPI}/industries?filter[where][depth]=${depth}`)
}

export const createIndustry = (industry) => {
  const accessToken = cookie.load('access_token')
  return axios.request({
    url: `${baseAPI}/industries`,
    method: 'post',
    data: industry,
    headers: {Authorization: accessToken},
  })  
}

export const destroyIndustry = (industry) => {
  const accessToken = cookie.load('access_token')
  return axios.request({
    url: `${baseAPI}/industries`,
    method: 'post',
    data: industry,
    headers: {Authorization: accessToken},
  })  
}