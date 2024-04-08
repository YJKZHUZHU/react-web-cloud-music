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
import { useApp } from '@/hooks'
import { useBoolean } from "ahooks"
import styles from "./index.scss"
import { useCreatorSongList, useFavoriteSongList } from "@/store/user"
import { Header, Aside } from './components'
import radius from '@/assets/layout/radius@2x.png'


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

  const actionRef = useRef<{
    reload: () => void
  }>()

  const onClose = () => {
    dispatch({
      type: "songInfoModel/setShowPlayRecord",
      payload: {
        showPlayRecord: false
      }
    })
  }



  const route = useMemo(() => {
    const result = [{
      name: `创建的歌单(${creatorSongList?.length || 0})`,
      icon: <AntDesignOutlined />,
      path: 'creatorPlayList',
      routes: mapPlayList(creatorSongList, 'creator'),
      show: creatorSongList.length !== 0
    }, {
      name: `收藏的歌单(${favoriteSongList?.length || 0})`,
      path: 'favoritePlayList',
      icon: <AntDesignOutlined />,
      routes: mapPlayList(favoriteSongList, 'favorite'),
      show: favoriteSongList.length !== 0
    }].filter(d => d.show)

    return {
      ...defaultRoutes,
      routes: [...defaultRoutes.routes, ...result]
    }
  }, [creatorSongList, favoriteSongList])


  return (
    <div className="flex flex-col h-[100vh] min-w-[1280px] overflow-y-hidden">
      <Header />
      <div className="flex flex-1 pb-[88px] bg-[#F2F1F6]">
        <aside className="w-[220px] bg-[#ffffff] overflow-scroll h-[calc(100vh-120px)] pb-[88px]">
          <Aside />
        </aside>

        <div className="bg-[length:40px_40px] bg-no-repeat bg-[url('../../assets/layout/radius@2x.png')] relative flex-1 h-[calc(100vh-120px)] w-[calc(100vw-220px)] overflow-scroll pt-[30px] px-[40px] pb-[100px]">
          <Outlet />
        </div>
      </div>
      <Footer />
      {pathname !== "/mv-detail" && <PlayerLayout />}
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

  );
}

export default BasicLayout
