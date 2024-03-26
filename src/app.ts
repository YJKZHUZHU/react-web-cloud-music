import { history, RequestConfig, RuntimeAntdConfig } from '@umijs/max'
import { message } from 'antd'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'

export function onRouteChange({ location, matchedRoutes }: any) {
  Nprogress.start()
  // const match = useMatch({ path: 'list/search/:type' })
  setTimeout(() => Nprogress.done(), 500)
  // if (location.pathname === '/') {
  //   history.push({
  //     pathname: '/recommend/findMusic/personal-recommendation'
  //   })
  // }
  // if (match.length) {
  //   document.title = match[match.length - 1].route.title || '';
  // }
  // if (matchedRoutes.length) {
  //   document.title = matchedRoutes[matchedRoutes.length - 1].route.title || '';
  // }
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
  // prefix: '/api',
  timeout: 100000, // 部分接口响应偏慢
  errorConfig: {
    errorHandler,
  },

  headers: {
    'Content-Type': 'multipart/form-data',
  },
  requestInterceptors: [
    // (config) => {
    //   if (config.url.indexOf('/api') !== 0) {
    //     config.url = `/api/v1/${url}`;
    //   }
    //   return config;
    // },
    (url, options: any) => {
      console.log('url--', url, options)
      Nprogress.start()
      // if (options.url.indexOf('/api') !== 0) {
      //   config.url = `/api/v1/${url}`;
      // }
      // if (options.params.loading === true) {
      //   delete options.params.loading
      // }
      return {
        url: `/api${url}`,
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

// export const antd: RuntimeAntdConfig = (memo: any) => {
//   console.log('memo', memo)
//   memo.theme ??= {
//     token: {
//       primaryColor: '#00a799', // 全局主色
//       linkColor: '#00a799', // 链接色
//       successColor: '#52c41a', // 成功色
//       warningColor: '#faad14', // 警告色
//       errorColor: '#f5222d', // 错误色
//       fontSizeBase: '14px', // 主字号
//       headingColor: '#00A799', // 标题色
//       textColor: '#00A799', // 主文本色
//       textColorSecondary: 'rgba(0, 0, 0, 0.45)', // 次文本色
//       disabledColor: '#00A799', // 失效色
//       borderRadiusBase: '4px', // 组件/浮层圆角
//       borderColorBase: '#d9d9d9', // 边框色
//       boxShadowBase: '0 2px 8px rgba(0, 0, 0, 0.15)', // 浮层阴影
//     }
//   };
//   // memo.theme.algorithm = theme.darkAlgorithm; // 配置 antd5 的预设 dark 算法

//   memo.appConfig = {
//     message: {
//       // 配置 message 最大显示数，超过限制时，最早的消息会被自动关闭
//       maxCount: 1,
//     }
//   }

//   return memo;
// };



