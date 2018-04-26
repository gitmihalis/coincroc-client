import axios from 'axios'
import {baseAPI} from './utils'

export const loadIndustries = (depth) => {
  return axios.get(`${baseAPI}/industries?filter[where][depth]=${depth}`)
}

