import React, {FC} from "react"
import AppContainer from "@/models/gloable"
import {Container, Subscribe, Provider} from "unstated"

const UnstatedSubscribe:FC = (Element:FC) => {
  return function(props: FC) {
    return (
      <Subscribe to={[AppContainer]}>
        {($app) => {
          return <Element {...props} $app={$app} />
        }}
      </Subscribe>
    )
  }
}
interface Prop {
  inject: any
  children: FC
}
const UnstatedProvider = (props: Prop) => {
  let models = props.inject
  if (!Array.isArray(models)) {
    models = [models]
  }
  return <Provider inject={models}>{props.children}</Provider>
}

export {UnstatedSubscribe as Subscribe, UnstatedProvider as Provider, Container}
