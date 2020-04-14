import axios from 'axios'
import { baseURL } from '../api/config'

export const methodType = {
  GET: 'GET',
  POST: 'POST',
  DELETE: 'DELETE',
  PUT: 'PUT'
}

export const request = (api, method = methodType.GET, params = {}, config = {}) => {
  const apiToken = ''
  const data = (method === 'GET') ? 'params' : 'data'

  let headers = {
    'x-device-id': 'A65069FB-C9EE-46CF-A7ED-69FE74125651',
    'x-net-use': 'wifi',
    'x-access-token': apiToken,
    'Content-Type': 'application/json'
  }

  if (config.headers) {
    headers = {
      ...headers,
      ...config.headers
    }
  }

  return new Promise((resolve, reject) => {
    axios({
      url: api,
      baseURL,
      method,
      [data]: params,
      headers
    }).then(resolve)
    .catch(error => {
      console.log('error:', error)
      reject(error)
    })
  })
}