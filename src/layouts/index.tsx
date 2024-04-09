/** @format */

import { useRef, createContext, FC, useMemo, useState } from "react"
import { Drawer, Avatar } from "antd"
import { useDispatch, useSelector, useLocation, history, useRouteProps, Outlet } from "@umijs/max"
import { PlayRecord, PlayerLayout } from "@/components"
import classnames from "classnames"
import Footer from "./Footer"
import { IState } from "typings"
import { useApp } from "@/hooks"
import { Header, Aside, TagsView } from "./components"
import classNames from "classnames"
import { MAP_MENU_PATH, MenuKeyEnum } from "@/constants/layout"

interface IGlobalContext {
  reloadMenu?: () => void
}
export const GlobalContext = createContext<IGlobalContext>({
  reloadMenu: undefined
})
const BasicLayout: FC = () => {
  useApp()
  const dispatch = useDispatch()
  const { songInfoModel } = useSelector<IState, IState>((state) => state)
  const { showPlayRecord } = songInfoModel
  const { pathname } = useLocation()
  const routeProps = useRouteProps()
  const [selectKeys, setSelectKeys] = useState<MenuKeyEnum[]>([routeProps.parentKey || MenuKeyEnum.FIND_MUSIC])
  const playerLayoutVisible = !["/mv-detail"].includes(pathname)

  const onClose = () => {
    dispatch({
      type: "songInfoModel/setShowPlayRecord",
      payload: {
        showPlayRecord: false
      }
    })
  }

  const onMenuItem = ({ item, key, keyPath, domEvent }: any) => {
    console.log("menuIte,", { item, key, keyPath, domEvent })
    setSelectKeys([key])
    const pathKey = key as unknown as MenuKeyEnum
    MAP_MENU_PATH.has(pathKey) && history.push(MAP_MENU_PATH.get(pathKey)!)
  }



  return (
    <div className="flex flex-col h-[100vh] min-w-[1280px] overflow-y-hidden">
      <Header >
        <TagsView selectKeys={selectKeys} />
      </Header>
      <div className="flex flex-1 bg-[#F2F1F6]">
        <Aside selectKeys={selectKeys} onMenuItem={onMenuItem} visible={playerLayoutVisible} />
        <div
          className={classNames(
            "bg-[length:40px_40px] bg-no-repeat bg-[url('../../assets/layout/radius@2x.png')] relative flex-1 h-[calc(100vh-120px)] w-[calc(100vw-220px)] overflow-scroll px-[40px] pt-[30px]",
            playerLayoutVisible ? 'pb-[100px]' : 'pb-[24px]'
          )}>
          <Outlet />
        </div>
      </div>
      <Footer />
      {playerLayoutVisible && <PlayerLayout />}
      <Drawer
        zIndex={99999}
        placement="right"
        style={{ paddingTop: 18 }}
        open={showPlayRecord}
        width={640}
        onClose={onClose}
        getContainer={false}>
        <PlayRecord />
      </Drawer>
    </div>
  )
}

export default BasicLayout
