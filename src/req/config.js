import Qs from 'qs'

const client_info = {
  clientType: 6,
  deviceCode: '',
  clientName: '',
  deviceName: '',
  deviceSysType: '',
  appVersion: '1.0.0',
  deviceSysVersion: '1.0.0'
};

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

export {standardConfig, serializeConfig}
