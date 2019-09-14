import Qs from 'qs'
import axios from 'axios'

const client_info = {
  clientType: 6,
  deviceCode: '',
  clientName: '',
  deviceName: '',
  deviceSysType: '',
  appVersion: '1.0.0',
  deviceSysVersion: '1.0.0'
};

// const post = (url, params, isForm, interceptor) => {
//   // 页面调用方法 => 
//   // const res = await api.login({phone: phoneTrim, password})

//   const res = axios.post(url, params, isForm ? serializeConfig : standardConfig);
//   if (interceptor) return res.then(interceptor) // 简写
//   // if(interceptor) {
//   //   return res.then(v => {
//   //     console.log('v',v);
//   //     return interceptor(v)
//   //   })
//   // }
//   return res;
// }

const post = (url, interceptor) => { // 颗粒化函数 
  // 颗粒化函数 => 页面调用的方法
  // const res = await api.login()({phone: phoneTrim, password})

  return function (data, isForm) {
    const res = axios.post(url, data, isForm ? serializeConfig : standardConfig);
    if (interceptor) return res.then(interceptor) // 简写
    return res;
  }
}

const standardConfig = {
  timeout: 30000,
  headers: {
      'Content-Type': 'application/json',
      'client_info': JSON.stringify(client_info)
  },
  responseType: 'json',
}

const serializeConfig = {
  transformRequest: [function (data) {
      data.params = JSON.stringify(data.params)
      data = Qs.stringify(data)
      return data
  }],
  headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'client_info': JSON.stringify(client_info)
  },
  timeout: 30000,
  responseType: 'json',
}

export {post, standardConfig, serializeConfig}
