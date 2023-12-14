import axios from 'axios'

const URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

export const config = {
  headers: {
    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
  }
}

const instance = axios.create({
  baseURL: URL,
  withCredentials: true
})

export default instance