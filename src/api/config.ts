import { extend } from 'umi-request'
import Nprogress from 'nprogress'
const errorHandler = (error: any) => {
  const code = [301, 400, 404, 405, 302]
  const { response = {}, data } = error
  const { status } = response
  //此时表示未登录
  if (code.includes(status)) {
    return data
  }
  return Promise.reject(error)
}

const request = extend({
  prefix: '/api',
  timeout: 3000,
  errorHandler,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
})


request.interceptors.request.use((url, options) => {
  Nprogress.start()
  return ({ url, options })
})
request.interceptors.response.use((response) => {
  Nprogress.done()

  if (response.status === 302) {
    return new Promise(() => { })
  }
  return response
})


export default request