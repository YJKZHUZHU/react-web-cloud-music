/** @format */

import React, {FC, Fragment} from "react"
import {Subscribe} from "@/Appcontainer"
import {DashboardOutlined, SyncOutlined, UnorderedListOutlined} from "@ant-design/icons"
import {Tooltip} from "antd"
import {appState} from "@/models/gloable"
import classnames from "classnames"
type Props = {
  $app: any
}

interface IMap {
  [propsName: number]: any
}

const MAP_TITLE: IMap = {
  0: "顺序播放",
  1: "单曲循环",
  2: "随机播放"
}
const MAP_ICON: IMap = {
  0: "icon-shunxubofang",
  1: "icon-icon-",
  2: "icon-suijibofang"
}
const MAP_MODE:IMap = {
  0: 1,
  1: 2,
  2: 0
}

const PlayRate: FC<Props> = (props) => {
  const {playMode} = props.$app.state
  return (
    <Tooltip placement="top" title={MAP_TITLE[playMode]}>
      <i
        className={classnames("iconfont", MAP_ICON[playMode])}
        onClick={() => appState.setPlayMode(MAP_MODE[playMode])}
      />
    </Tooltip>
  )
}

// @ts-ignore
export default Subscribe(PlayRate)
