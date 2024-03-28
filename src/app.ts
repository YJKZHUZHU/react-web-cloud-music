import { history, RequestConfig } from '@umijs/max'
import { message } from 'antd'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import qs from 'qs'

export function onRouteChange({ location, matchedRoutes }: any) {
  Nprogress.start()
  // const match = useMatch({ path: 'list/search/:type' })
  setTimeout(() => Nprogress.done(), 500)
  if (location.pathname === '/') {
    history.push('/personal-recommendation')
  }
  // if (match.length) {
  //   document.title = match[match.length - 1].route.title || '';
  // }
  if (matchedRoutes?.length) {
    document.title = matchedRoutes[matchedRoutes.length - 1].route.title || '';
  }
}


const errorHandler = (error: any) => {
  const code = [301, 400, 404, 405, 302, 503]
  const { response = {}, data } = error
  const { status } = response
  //此时表示未登录
  if (code.includes(status)) {
    return data
  }
  return Promise.reject(error)
}

export const request: RequestConfig = {
  timeout: 100000, // 部分接口响应偏慢
  errorConfig: {
    errorHandler,
  },

  headers: {
    'Content-Type': 'multipart/form-data',
  },
  requestInterceptors: [

    (_, options: any) => {
      Nprogress.start()
      const [url, queryString] = options.url?.split("?") || []
      console.log('url', url, options)
      let obj = Object.create(null)
      obj.timestamp = Date.now()
      if (queryString) {
        obj = {
          ...obj,
          ...qs.parse(queryString),
        }
      }

      const query = qs.stringify(obj)

      return {
        url: `/api/${url}?${query}`,
        options
      }
    }
  ],
  responseInterceptors: [
    (response) => {
      Nprogress.done()
      if (response.status === 301) {
        message.info('登录可以体验更多功能哦！')
        history.push('/login')
      }
      if (response.status === 302) {
        return new Promise(() => { })
      }
      return response
    }
  ]
}




