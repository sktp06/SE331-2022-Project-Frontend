import axios from 'axios'

const apiClient = axios.create({
  baseURL:"http://52.3.212.99:8999",
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})
export default apiClient
