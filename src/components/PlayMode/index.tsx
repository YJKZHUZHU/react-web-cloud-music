/** @format */

import React from "react"
import { Dropdown, MenuProps, Tooltip } from "antd"
import classnames from "classnames"
import { useSelector, useDispatch } from "@umijs/max"
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
  const { playMode } = useSelector((state: IState) => state.playmodel)

  const items: MenuProps['items'] = [
    {
      key: 0,
      label: '顺序播放',
    },
    {
      key: 1,
      label: '单曲循环',
    },
    {
      key: 2,
      label: '随机播放',
    },
  ].map(d => {
    return {
      ...d,
      onClick: () => dispatch({
        type: "playmodel/setPlayMode",
        payload: {
          playMode: d.key
        }
      })
    }
  })

  return <Dropdown overlayStyle={{ width: 100 }} menu={{ items }} placement="top" arrow>
    <i className={classnames("iconfont", MAP_ICON[playMode], '!text-[24px]', 'cursor-pointer')}></i>
  </Dropdown>
  return (
    <Tooltip placement="top" title={MAP_TITLE[playMode]}>
      <i
        className={classnames("iconfont", MAP_ICON[playMode], '!text-[24px]')}
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
