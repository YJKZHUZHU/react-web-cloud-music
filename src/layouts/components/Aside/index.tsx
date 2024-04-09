/** @format */

import { Menu } from "antd"
import { FC } from "react"
import { menuList } from "@/constants/layout"
import classNames from "classnames"

interface IProps {
  visible: boolean
  selectKeys: string[],
  onMenuItem: (item: any) => void
}
const Aside: FC<IProps> = ({ visible, selectKeys, onMenuItem }) => {


  return (
    <aside
      className={classNames(
        "w-[220px] bg-[#ffffff] overflow-scroll h-[calc(100vh-120px)]",
        visible ? "pb-[88px]" : "pb-[24px]"
      )}>
      <Menu
        selectedKeys={selectKeys}
        onClick={onMenuItem}
        mode="inline"
        style={{ width: 220, borderInlineEndColor: "#ffffff" }}
        items={menuList}
      />
    </aside>
  )
}

export default Aside
