import { useRef, createContext, FC, useMemo } from "react"
import { Drawer, Avatar } from "antd"
import { useDispatch, useSelector, useLocation, history, Outlet } from "@umijs/max"
import { PlayRecord, PlayerLayout, Header, MenuItem } from "@/components"
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
    <div className="min-w-[1280px]">
      <ProLayout
        token={{
          header: {
            heightLayoutHeader: 65,
            colorBgHeader: '#ffffff'
          },
          sider: {
            colorMenuBackground: '#ffffff',
          },

        }}
        disableMobile
        layout="mix"
        actionRef={actionRef}
        fixSiderbar={true}
        fixedHeader={false}
        collapsed={collapsed}
        collapsedButtonRender={false}
        title={false}
        onCollapse={toggle}
        theme="light"
        route={route}
        siderWidth={300}
        className={classnames(styles.home, { [styles._homeDiff]: pathname === "/mv-detail" })}
        location={{ pathname }}
        menuHeaderRender={false}
        menuItemRender={(item, dom) => {
          return (
            <MenuItem reload={actionRef?.current?.reload} menuItem={item}>
              {dom}
            </MenuItem>
          )
        }}
        contentStyle={{
          minWidth: 900
        }}
        headerRender={() => {
          return (
            <Header>
              {
                collapsed ? (<div className="w-[64px] flex items-center pl-[15px]">
                  <Avatar onClick={() => history.push("/personal-recommendation")} src={Object.keys(userInfo).length && userInfo.profile.avatarUrl} />
                </div>) : (<div className="w-[300px] flex items-center pl-[15px]"><img onClick={() => history.push("/personal-recommendation")} style={{ height: 65 }} src={require("../assets/home.png")}></img></div>)
              }


              <div onClick={() => toggle(!collapsed)} className={classnames(styles.collapsed, 'mx-[5px]')}>
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              </div>
              <AddSongList reload={actionRef?.current?.reload} />
            </Header>

          )
        }}
        footerRender={() => <Footer />}>
        <GlobalContext.Provider value={{ reloadMenu: actionRef.current?.reload }}>
          <Outlet />
          {pathname !== "/mv-detail" && <PlayerLayout />}

        </GlobalContext.Provider>
      </ProLayout>
      <Drawer
        zIndex={99999}
        rootClassName={styles.drawer}
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
