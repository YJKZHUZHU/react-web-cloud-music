/** @format */

import {createContext, FC, useState} from "react"
import {Drawer, Flex} from "antd"
import {useLocation, history, useRouteProps, Outlet} from "@umijs/max"
import {PlayRecord, PlayerLayout} from "@/components"
import {useApp} from "@/hooks"
import {Header, Aside, TagsView} from "./components"
import classNames from "classnames"
import {MAP_MENU_PATH, MenuKeyEnum} from "@/constants/layout"
import {useSetShowPlayRecord, useShowPlayRecord} from "@/store/player"
import Footer from "./Footer"

interface IGlobalContext {
  reloadMenu?: () => void
}
export const GlobalContext = createContext<IGlobalContext>({
  reloadMenu: undefined
})
const BasicLayout: FC = () => {
  useApp()
  const showPlayRecord = useShowPlayRecord()
  const setShowPlayRecord = useSetShowPlayRecord()
  const {pathname} = useLocation()
  const routeProps = useRouteProps()
  const [selectKeys, setSelectKeys] = useState<MenuKeyEnum[]>([
    routeProps.parentKey || MenuKeyEnum.FIND_MUSIC
  ])
  const playerLayoutVisible = !["/mv-detail"].includes(pathname)

  const onMenuItem = ({item, key, keyPath, domEvent}: any) => {
    console.log("menuIte,", {item, key, keyPath, domEvent})
    setSelectKeys([key])
    const pathKey = key as unknown as MenuKeyEnum
    MAP_MENU_PATH.has(pathKey) && history.push(MAP_MENU_PATH.get(pathKey)!)
  }

  return (
    <Flex vertical className="h-[100vh] min-w-[1280px] overflow-y-hidden">
      <Header>
        <TagsView selectKeys={selectKeys} />
      </Header>
      <Flex flex={1} className="bg-[#F2F1F6]">
        <Aside selectKeys={selectKeys} onMenuItem={onMenuItem} visible={playerLayoutVisible} />
        <div
          id="_contentContainer"
          className={classNames(
            "bg-[length:40px_40px] bg-no-repeat bg-[url('../../assets/layout/radius@2x.png')] relative flex-1 h-[calc(100vh-120px)] w-[calc(100vw-220px)] overflow-scroll px-[40px] pt-[30px]",
            playerLayoutVisible ? "pb-[100px]" : "pb-[24px]"
          )}>
          <Outlet />
        </div>
      </Flex>

      <Footer />
      {playerLayoutVisible && <PlayerLayout />}
      <Drawer
        zIndex={99999}
        placement="right"
        style={{paddingTop: 18}}
        open={showPlayRecord}
        width={640}
        onClose={() => setShowPlayRecord(false)}
        getContainer={false}>
        <PlayRecord />
      </Drawer>
    </Flex>
  )
}

export default BasicLayout
