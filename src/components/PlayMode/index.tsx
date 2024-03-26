/** @format */

import React from "react"
import {Tooltip} from "antd"
import classnames from "classnames"
import {useSelector, useDispatch} from "@umijs/max"
import { IState } from 'typings'


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
const MAP_MODE: IMap = {
  0: 1,
  1: 2,
  2: 0
}

const PlayMode = () => {
  const dispatch = useDispatch()
  const {playMode} = useSelector((state: IState) => state.playmodel)
  return (
    <Tooltip placement="top" title={MAP_TITLE[playMode]}>
      <i
        className={classnames("iconfont", MAP_ICON[playMode])}
        onClick={() =>
          dispatch({
            type: "playmodel/setPlayMode",
            payload: {
              playMode: MAP_MODE[playMode]
            }
          })
        }
      />
    </Tooltip>
  )
}

export default PlayMode
