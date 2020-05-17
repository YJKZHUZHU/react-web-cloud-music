import React,{FC} from 'react'
import {Provider} from 'unstated'
import {appState} from '@/models/gloable'
import HomeLayout from '@/layouts/HomeLayout'
type Props = {
  location: any
}
const BasicLayout: FC<Props> = (props) => {
  return (
    <Provider inject={[appState]}>
      <HomeLayout>
        {props.children}
      </HomeLayout>

    </Provider>

  )
}

export default BasicLayout
