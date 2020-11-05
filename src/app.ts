import { history, RequestConfig } from 'umi'
import { message } from 'antd'
import Nprogress from 'nprogress'
import { appState } from '@/models/gloable'
import 'nprogress/nprogress.css'

export function onRouteChange({ location, matchedRoutes }: any) {
  Nprogress.start()
  setTimeout(() => Nprogress.done(), 500)
  if (location.pathname === '/') {
    history.push({
      pathname: '/recommend/findMusic/personal-recommendation'
    })
  }
  if (matchedRoutes.length) {
    document.title = matchedRoutes[matchedRoutes.length - 1].route.title || '';
  }
}


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

export const request: RequestConfig = {
  prefix: '/api',
  timeout: 100000, // 部分接口响应偏慢
  errorHandler,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  requestInterceptors: [
    (url, options: any) => {
      Nprogress.start()
      if (options.params.loading === true) {
        appState.setLoading(true)
        delete options.params.loading
      }
      return {
        url,
        options
      }
    }
  ],
  responseInterceptors: [
    (response) => {
      Nprogress.done()
      appState.setLoading(false)
      if (response.status === 301) {
        message.info('登录才能进行相关操作哦。。。')
      }
      if (response.status === 302) {
        return new Promise(() => { })
      }
      return response
    }
  ]
}



