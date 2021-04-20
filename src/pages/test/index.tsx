/** @format */

import React, {useState, useEffect, FC} from "react"
import {Card} from "@/components"
import {message, Space, Button} from "antd"
import {useRequest} from "ahooks"
import QrCode from "qrcode.react"
import API from "@/api"
import {QrLogin} from "@/components"

// 高阶组件

interface IWrapComponent {
  couter: number
  incr: (increment: number) => void
  desc: (decrement: number) => void
}

const useCouter = (initCouter?: number) => {
  const [couter, setCouter] = useState(initCouter || 0)
  const incr = async (increment: number = 1) => {
    await setCouter((couter) => couter + increment)
    console.log(couter)
  }
  const desc = (decrement: number = 1) => setCouter((couter) => couter - decrement)
  return {
    couter,
    incr,
    desc
  }
}

const ConterComponent = (WrapComponent: React.JSXElementConstructor<IWrapComponent>) => {
  return class extends React.Component<any, {couter: number}> {
    state = {
      couter: 0
    }

    incr = async (increment: number = 1) => {
      await this.setState((state) => {
        return {
          couter: state.couter + increment
        }
      })
      console.log(this.state.couter)
    }
    desc = (decrement: number = 1) => {
      this.setState((state) => {
        return {
          couter: state.couter - decrement
        }
      })
    }
    render() {
      const conterProps = {
        couter: this.state.couter,
        incr: this.incr,
        desc: this.desc
      }
      return <WrapComponent {...this.props} {...conterProps} />
    }
  }
}

const Couter:FC<IWrapComponent> = (props) => {
  const {couter, incr, desc} = props
  return (
    <Space>
      <Button onClick={() => incr(1)}>+</Button>
      <Button onClick={() => desc(1)}>-</Button>
      <span>{couter}</span>
    </Space>
  )
}

export default ConterComponent(Couter)
