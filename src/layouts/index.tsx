/** @format */

import { useRef, createContext, FC, useMemo } from "react"
import { Drawer, Avatar } from "antd"
import { useDispatch, useSelector, useLocation, history, Outlet } from "@umijs/max"
import { PlayRecord, PlayerLayout, MenuItem } from "@/components"
import classnames from "classnames"
import { MenuUnfoldOutlined, MenuFoldOutlined, AntDesignOutlined } from "@ant-design/icons"
import Footer from "./Footer"
import ProLayout from "@ant-design/pro-layout"
import { defaultRoutes, mapPlayList } from "./Router"
import { AddSongList } from "@/components/Header/components"
import { IState } from "typings"
import { useApp } from "@/hooks"
import { useBoolean } from "ahooks"
import { useCreatorSongList, useFavoriteSongList } from "@/store/user"
import { Header, Aside } from "./components"
import classNames from "classnames"

interface IGlobalContext {
  reloadMenu?: () => void
}
export const GlobalContext = createContext<IGlobalContext>({
  reloadMenu: undefined
})
const BasicLayout: FC = () => {
  useApp()
  const creatorSongList = useCreatorSongList()
  const favoriteSongList = useFavoriteSongList()
  const dispatch = useDispatch()
  const { userModel, songInfoModel, loading } = useSelector<IState, IState>((state) => state)
  const { userInfo, userId } = userModel
  const { showPlayRecord } = songInfoModel
  const [collapsed, { toggle }] = useBoolean(false)
  const { pathname } = useLocation()

  const onClose = () => {
    dispatch({
      type: "songInfoModel/setShowPlayRecord",
      payload: {
        showPlayRecord: false
      }
    })
  }

  const playerLayoutVisible = !["/mv-detail"].includes(pathname)

  return (
    <div className="flex flex-col h-[100vh] min-w-[1280px] overflow-y-hidden">
      <Header />
      <div className="flex flex-1 bg-[#F2F1F6]">
        <Aside visible={playerLayoutVisible} />
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
