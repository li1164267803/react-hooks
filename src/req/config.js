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

const post = (url, params, isForm, interceptor) => {
  const res = axios.post(url, params, isForm ? serializeConfig : standardConfig);
  if (interceptor) return res.then(interceptor) // 简写
  // if(interceptor) {
  //   return res.then(v => {
  //     console.log('v',v);
  //     return interceptor(v)
  //   })
  // }
  return res;
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
