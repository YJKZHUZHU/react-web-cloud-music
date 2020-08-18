import { history, RequestConfig } from 'umi'
import Nprogress from 'nprogress'
import { appState } from '@/models/gloable'

export function onRouteChange({ location, matchedRoutes }: any) {
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
  timeout: 3000,
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
      if (response.status === 302) {
        return new Promise(() => { })
      }
      return response
    }
  ]
}



