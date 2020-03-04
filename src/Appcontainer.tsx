import React, {FC} from 'react'
import AppContainer from '@/models/gloable'
import {Container, Subscribe, Provider} from 'unstated'


// @ts-ignore
const UnstatedSubscribe:FC = (Element) => {
  return function(props:any) {
    return (
      <Subscribe to={[AppContainer]}>
        {
          $app => {
            // @ts-ignore
            return <Element {...props} $app={$app}/>
          }
        }
      </Subscribe>
    )
  }
}

const UnstatedProvider = (props:any) => {
  let models = props.inject
  if (!Array.isArray(models)) {
    models = [models]
  }
  return (
    <Provider inject={models}>
      {props.children}
    </Provider>
  )
}

export {
  UnstatedSubscribe as Subscribe,
  UnstatedProvider as Provider,
  Container
}
