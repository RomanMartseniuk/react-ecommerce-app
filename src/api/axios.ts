import axios from 'axios'

const baseURL = 'https://api.escuelajs.co/api/v1'



const request = axios.create({baseURL});

export default request;