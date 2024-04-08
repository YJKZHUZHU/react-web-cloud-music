/** @format */

import { Menu, MenuProps } from "antd"
import { FC, useEffect, useState } from "react"
import { history, useLocation, useRouteProps } from "@umijs/max"
import { MAP_MENU_PATH, MenuKeyEnum } from "@/constants/layout"
import classNames from "classnames"

type MenuItem = Required<MenuProps>["items"][number]

const Aside: FC<{ visible: boolean }> = ({ visible }) => {
  const routeProps = useRouteProps()
  const [selectKeys, setSelectKeys] = useState([routeProps.parentKey || MenuKeyEnum.FIND_MUSIC])
  const location = useLocation()

  const items: MenuItem[] = [
    {
      label: "发现音乐",
      key: MenuKeyEnum.FIND_MUSIC
      // icon:
    },
    {
      label: "精彩视频",
      key: MenuKeyEnum.VIDEO
      // icon:
    },
    {
      label: "我的音乐",
      key: MenuKeyEnum.MY_MUSIC
      // icon:
    },
    {
      label: "我的歌单",
      key: MenuKeyEnum.MY_SONG_LIST
      // icon:
    }
  ]
  const onMenuItem = ({ item, key, keyPath, domEvent }: any) => {
    console.log("menuIte,", { item, key, keyPath, domEvent })
    // if (selectKeys.includes(key)) return
    setSelectKeys([key])
    const pathKey = key as unknown as MenuKeyEnum
    MAP_MENU_PATH.has(pathKey) && history.push(MAP_MENU_PATH.get(pathKey)!)
  }

  return (
    <aside className={classNames("w-[220px] bg-[#ffffff] overflow-scroll h-[calc(100vh-120px)]", visible ? 'pb-[88px]' : 'pb-[24px]')}>
      <Menu
        selectedKeys={selectKeys}
        onClick={onMenuItem}
        mode="inline"
        style={{ width: 220, borderInlineEndColor: "#ffffff" }}
        items={items}
      />
    </aside>

  )
}

export default Aside
