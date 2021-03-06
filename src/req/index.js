import axios from 'axios'
import {Toast} from 'antd-mobile';
import {HashRouter} from "react-router-dom"
// import {standardConfig, serializeConfig} from './config'
import {post} from './config'


// const get = (url, params) => axios.get(url, {params, ...standardConfig})
// const post = (url, data, isForm) => axios.post(url, data, isForm ? serializeConfig : standardConfig)

// function post(url, params, config, interceptor) {
//     const res = axios.post(url, params, config);
//     if (interceptor) return res.then(interceptor) // 简写
//     // if(interceptor) {
//     //   return res.then(v => {
//     //     console.log('v',v);
//     //     return interceptor(v)
//     //   })
//     // }
//     return res;
// }
class API {
  login(params) {
    return post('/api/auth/login/v1/password', data => { // 函数颗粒化
      // 可以二次处理请求回来的数据
      console.log(555555555);
      return data
    })
    
    // return post('/api/auth/login/v1/password', params, false, data => {
    //   // 可以二次处理请求回来的数据
    //   console.log(555555555);
    //   return data
    // })
    
    // return  axios.post('/api/auth/login/v1/password', params, standardConfig) // 正常请求
  }

  // ----------------------------------- GET ---------------------------------------------
  // 获取省市的列表
  getCityList() {
    return axios.get('/api/amc/v1/com/province/city/list')
  }

  // 获取代理信息列表
  getAgentAetail(cityCode) {
    return axios.get(`/api/amc/v1/manage/${cityCode}/agent/detail`)
  }
}

axios.interceptors.request.use(
  config => {
      localStorage.token && (config.headers['authorization'] = 'authorization' + localStorage.token)
      return config
  },
  err => Promise.reject(err)
)

const router = new HashRouter(), redirectCodes = [90000, 91000, 91001, 91002]

axios.interceptors.response.use(
  res => {
    const {data: {code, data, message}} = res;
    if(code !== 200) {
      Toast.info(message);
      if(redirectCodes.includes(code)) {
        localStorage.clear()
        router.history.push('/login')
      }
      return Promise.reject(res)
    }
    return Promise.resolve(data)
  },
  err => Promise.reject(err)
)

export default API
