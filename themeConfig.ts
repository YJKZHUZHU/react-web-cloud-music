
const themeArr = [
  {
    fileName: 'black.css',
    key: 'black',
    modifyVars: {
      '@primary-color': '#b1b1b1',//全局主色
      '@link-color': '6f6f6f', // 链接色
      '@success-color': '#52c41a', // 成功色
      '@warning-color': '#faad14', // 警告色
      '@error-color': '#f5222d', // 错误色
      '@font-size-base': '14px', // 主字号
      '@heading-color': '#b1b1b1', // 标题色
      '@text-color': '#b1b1b1', // 主文本色
      '@text-color-secondary': ' rgba(0, 0, 0, .45)', // 次文本色
      '@disabled-color': '#b1b1b1', // 失效色
      '@border-radius-base': '4px', // 组件/浮层圆角
      '@border-color-base': '#d9d9d9', // 边框色
      '@box-shadow-base': '0 2px 8px rgba(0, 0, 0, 0.15)' // 浮层阴影
    }
  },
  {
    fileName: 'red.css',
    key: 'red',
    modifyVars: {
      '@primary-color': '#D74d45',//全局主色
      '@link-color': 'rgba(0, 0, 0, 0.65)', // 链接色
      '@success-color': '#52c41a', // 成功色
      '@warning-color': '#faad14', // 警告色
      '@error-color': '#f5222d', // 错误色
      '@font-size-base': '14px', // 主字号
      '@heading-color': 'rgba(0, 0, 0, 0.85)', // 标题色
      '@text-color': 'rgba(0, 0, 0, 0.65)', // 主文本色
      '@text-color-secondary': ' rgba(0, 0, 0, .45)', // 次文本色
      '@disabled-color': 'rgba(0, 0, 0, .25)', // 失效色
      '@border-radius-base': '4px', // 组件/浮层圆角
      '@border-color-base': '#d9d9d9', // 边框色
      '@box-shadow-base': '0 2px 8px rgba(0, 0, 0, 0.15)' // 浮层阴影
    }
  },
  {
    fileName: 'shallow.css',
    key: 'shallow',
    modifyVars: {
      '@primary-color': '#4a4a4a',//全局主色
      '@link-color': 'rgba(0, 0, 0, 0.65)', // 链接色
      '@success-color': '#52c41a', // 成功色
      '@warning-color': '#faad14', // 警告色
      '@error-color': '#f5222d', // 错误色
      '@font-size-base': '14px', // 主字号
      '@heading-color': 'rgba(0, 0, 0, 0.85)', // 标题色
      '@text-color': 'rgba(0, 0, 0, 0.65)', // 主文本色
      '@text-color-secondary': ' rgba(0, 0, 0, .45)', // 次文本色
      '@disabled-color': 'rgba(0, 0, 0, .25)', // 失效色
      '@border-radius-base': '4px', // 组件/浮层圆角
      '@border-color-base': '#d9d9d9', // 边框色
      '@box-shadow-base': '0 2px 8px rgba(0, 0, 0, 0.15)' // 浮层阴影
    }
  }
]

module.exports = themeArr
