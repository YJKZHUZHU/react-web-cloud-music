import React from 'react'
import {Provider} from 'unstated'
import {appState} from '@/models/gloable'
import HomeLayout from '@/layouts/HomeLayout'
type Props = {
  location: any
}
const BasicLayout: React.FC<Props> = (props:any) => {
  // @ts-ignore
  return (
    <Provider inject={[appState]}>
      <HomeLayout>
        {props.children}
      </HomeLayout>

    </Provider>

  )
}

export default BasicLayout
