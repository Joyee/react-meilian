import axios from 'axios'
import { baseURL, baseAlbumURL } from '../api/config'
import md5 from 'crypto-js/md5'
const signKey = 'nsdjkfnskjJBfhbs'

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

const getSign = (api, args = {}) => {
  let time = parseInt(new Date() / 1000, 10)
  let data = { ...argsKeySort(args), 's': api, 'signTime': time}
  let string = ''
  let objStr = objToString(argsKeySort(data))
  // console.log(argsKeySort(data))
  string = md5(objStr + signKey).toString()
  // console.log(objStr)
  let header = {
    'x-access-sign': string,
    'x-access-time': data.signTime,
    'x-os': 'ios'
  }
  return header
}

// const paramsStrSort = (api, paramsStr) => {
//   // kAppKey
//   const signTime = new Date().getTime()
//   paramsStr = paramsStr.sort()
//   let urlStr = api + paramsStr + signTime + signKey
//   urlStr = md5(urlStr.toString())
//   return urlStr
// }

// 参数 按key 升序排序
export function argsKeySort(args) {
  let init_newkeys = Object.keys(args).sort()
  let newObj = {}, newObj1 = {}, newObj2 = {}, newObj3 = {}
  // 对初始key遍历 生成新对对象
  init_newkeys.map((item) => {
    if (typeof args[item] === 'object') {
      newObj2 = {}
    } else {
      newObj3[item] = args[item]
    }
  })
  if (newObj3) {
    newObj1 = Object.assign(newObj2, newObj3)
  }

  let newkeys = Object.keys(newObj1).sort()

  for (let i = 0; i < newkeys.length; i++) {
    newObj[newkeys[i]] = newObj1[newkeys[i]]
  }
  return newObj
}

// 对象类型转字符串
export function objToString(data) {
  let str = ''
  for (let k in data) {
    str += data[k]
  }
  return str
}

export const albumRequest = (api, method = methodType.GET, params = {}, config = {}) => {
  const data = (method === 'GET') ? 'params' : 'data'

  let headers = {
    'uid': 3691953,
    'x-os': 'ios',
    'Content-Type': 'application/json',
    ...getSign(api, params)
  }

  if (config.headers) {
    headers = {
      ...headers,
      ...config.headers,
    }
  }

  return new Promise((resolve, reject) => {
    axios({
      url: api,
      baseURL: baseAlbumURL,
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