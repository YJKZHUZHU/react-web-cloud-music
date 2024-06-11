/** @format */

import {FC, useEffect} from "react"
import {Flex} from "antd"
import {useLocation, useRouteProps, Outlet} from "@umijs/max"
import {useApp} from "@/hooks"
import {useSetIsPlay} from "@/store/player"
import classNames from "classnames"
import {useSetActiveMenu} from "@/store/app"
import PlayHistoryLayout from "./PlayHistoryLayout"
import Footer from "./Footer"
import PlayerLayout from "./PlayerLayout"
import {Header, Aside, TagsView} from "./components"

const BasicLayout: FC = () => {
  useApp()
  const setIsPlay = useSetIsPlay()
  const {pathname} = useLocation()
  const routeProps = useRouteProps()
  const setActiveMenu = useSetActiveMenu()

  const showFooter = !pathname.startsWith("/mv-detail") && !pathname.startsWith("/video-detail")

  useEffect(() => {
    if (!showFooter) {
      setIsPlay(false)
    }
  }, [showFooter])

  useEffect(() => {
    setActiveMenu(routeProps.parentKey || "")
  }, [routeProps])

  return (
    <Flex vertical className={classNames("h-[100vh] min-w-[1280px] overflow-y-hidden")}>
      <Header>
        <TagsView />
      </Header>
      <Flex flex={1} className="bg-[#F2F1F6]">
        <Aside visible={showFooter} />
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
