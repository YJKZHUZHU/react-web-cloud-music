/** @format */

import React, {FC} from "react"
import AppContainer from "@/models/gloable"
import {Container, Subscribe, Provider} from "unstated"

const UnstatedSubscribe = (Element: React.ReactNode) => {
  return function (props: any) {
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
}

const UnstatedProvider: FC<Prop> = ({inject, children}) => {
  let models = inject
  if (!Array.isArray(models)) {
    models = [models]
  }
  return <Provider inject={models}>{children}</Provider>
}

export {UnstatedSubscribe as Subscribe, UnstatedProvider as Provider, Container}
