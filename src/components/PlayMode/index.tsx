/** @format */

import {Dropdown, MenuProps, Tooltip} from "antd"
import classnames from "classnames"
import {PlayerModeEnum, usePlayerMode, useSetPlayerMode} from "@/store/player"

interface IMap {
  [propsName: number]: any
}

const MAP_ICON: IMap = {
  0: "icon-shunxubofang",
  1: "icon-icon-",
  2: "icon-suijibofang"
}

const PlayMode = () => {
  const setPlayerMode = useSetPlayerMode()

  const playerMode = usePlayerMode()

  const items: MenuProps["items"] = [
    {
      key: PlayerModeEnum.order,
      label: "顺序播放"
    },
    {
      key: PlayerModeEnum.cycle,
      label: "单曲循环"
    },
    {
      key: PlayerModeEnum.random,
      label: "随机播放"
    }
  ].map((d) => {
    return {
      ...d,
      onClick: () => setPlayerMode(d.key)
    }
  })

  return (
    <Dropdown overlayStyle={{width: 100}} menu={{items}} placement="top" arrow>
      <i
        className={classnames(
          "iconfont",
          MAP_ICON[playerMode],
          "!text-[24px]",
          "cursor-pointer"
        )}></i>
    </Dropdown>
  )
}

export default PlayMode
