import { extend } from 'umi-request'
import Nprogress from 'nprogress'
import { appState } from '@/models/gloable'
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


request.interceptors.request.use((url, options: any) => {
  Nprogress.start()
  if (options.params.loading === true) {
    appState.setLoading(true)
    delete options.params.loading
  }
  return ({ url, options })
})
request.interceptors.response.use((response) => {
  Nprogress.done()
  appState.setLoading(false)
  if (response.status === 302) {
    return new Promise(() => { })
  }
  return response
})


export default request