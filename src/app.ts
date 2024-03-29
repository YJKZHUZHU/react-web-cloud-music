import { history, RequestConfig, RuntimeConfig, RuntimeAntdConfig } from '@umijs/max'
import { message } from 'antd'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import qs from 'qs'
import zh_cn from "antd/lib/locale/zh_CN"
import { theme } from 'antd';

Nprogress.configure({
  showSpinner: false
})

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

export const antd: RuntimeAntdConfig = (memo) => {
  console.log('memp', memo)
  memo.locale = zh_cn

  memo.input ??= {
    autoComplete: "off"
  }

  memo.theme ??= {
    token: {
      colorPrimary: '#00a799', // 全局主色
      colorLink: '#00a799', // 链接色
      colorSuccess: '#52c41a', // 成功色
      colorWarning: '#faad14', // 警告色
      colorError: '#f5222d', // 错误色
      fontSize: 14, // 主字号
      colorTextHeading: '#00A799', // 标题色
      colorText: '#00A799', // 主文本色
      colorTextSecondary: 'rgba(0, 0, 0, 0.45)', // 次文本色
      colorTextDisabled: '#00A799', // 失效色
      borderRadius: 4, // 组件/浮层圆角
      colorBorder: '#d9d9d9', // 边框色
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)', // 浮层阴影
    }
  };
  // memo.theme.algorithm = theme.darkAlgorithm; // 配置 antd5 的预设 dark 算法


  (memo as any).appConfig = {
    message: {
      // 配置 message 最大显示数，超过限制时，最早的消息会被自动关闭
      maxCount: 1,
      duration: 1,
    }
  }

  return memo;
};





