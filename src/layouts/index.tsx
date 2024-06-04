/** @format */

import {createContext, FC, useEffect, useState} from "react"
import {Flex} from "antd"
import {useLocation, history, useRouteProps, Outlet} from "@umijs/max"
import {useApp} from "@/hooks"
import {useSetIsPlay} from "@/store/player"
import classNames from "classnames"
import {MAP_MENU_PATH, MenuKeyEnum} from "@/constants/layout"
import PlayHistoryLayout from "./PlayHistoryLayout"
import Footer from "./Footer"
import PlayerLayout from "./PlayerLayout"
import {Header, Aside, TagsView} from "./components"

interface IGlobalContext {
  reloadMenu?: () => void
}
export const GlobalContext = createContext<IGlobalContext>({
  reloadMenu: undefined
})
const BasicLayout: FC = () => {
  useApp()
  const setIsPlay = useSetIsPlay()
  const {pathname} = useLocation()
  const routeProps = useRouteProps()
  const [selectKeys, setSelectKeys] = useState<MenuKeyEnum[]>([
    routeProps.parentKey || MenuKeyEnum.FIND_MUSIC
  ])

  const showFooter = !pathname.startsWith("/mv-detail") && !pathname.startsWith("/video-detail")

  const onMenuItem = ({item, key, keyPath, domEvent}: any) => {
    setSelectKeys([key])
    const pathKey = key as unknown as MenuKeyEnum
    MAP_MENU_PATH.has(pathKey) && history.push(MAP_MENU_PATH.get(pathKey)!)
  }

  useEffect(() => {
    if (!showFooter) {
      setIsPlay(false)
    }
  }, [showFooter])

  return (
    <Flex vertical className={classNames("h-[100vh] min-w-[1280px] overflow-y-hidden")}>
      <Header>
        <TagsView selectKeys={selectKeys} />
      </Header>
      <Flex flex={1} className="bg-[#F2F1F6]">
        <Aside selectKeys={selectKeys} onMenuItem={onMenuItem} visible={showFooter} />
        <div
          id="_contentContainer"
          className={classNames(
            "bg-[length:40px_40px] bg-no-repeat bg-[url('../../assets/layout/radius@2x.png')] relative  overflow-scroll px-[30px] pt-[30px] flex flex-col flex-1 h-[calc(100vh-60px)] w-[calc(100vw-220px)]",
            showFooter ? "pb-[110px]" : "pb-[30px]"
          )}>
          <Outlet />
        </div>
      </Flex>

      <Footer
        className={classNames(
          "transition-transform",
          showFooter ? "transform-none" : "translate-y-[80px]"
        )}
      />
      <PlayerLayout />
      <PlayHistoryLayout />
    </Flex>
  )
}

export default BasicLayout
