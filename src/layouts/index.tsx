import React,{FC} from 'react'
import {Provider} from 'unstated'
import {appState} from '@/models/gloable'
import HomeLayout from '@/layouts/HomeLayout'
import {ConfigProvider } from 'antd'
import zh_cn from 'antd/lib/locale/zh_CN'
const CONFIG = {
  input: {
    autoComplete: "off"
  },
  locale: zh_cn
}
const BasicLayout: FC=(props) => {
  return (
    <Provider inject={[appState]}>
      <ConfigProvider {...CONFIG}>
        <HomeLayout>{props.children}</HomeLayout>
      </ConfigProvider>
    </Provider>
  )
}

export default BasicLayout
