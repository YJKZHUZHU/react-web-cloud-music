/** @format */

import React, {FC, useEffect, useRef, createContext} from "react"
import zh_cn from "antd/lib/locale/zh_CN"
import {Drawer, Avatar, ConfigProvider, Button} from "antd"
import {useDispatch, useSelector, useLocation, useHistory, request,history} from "umi"
import {PlayRecord, PlayerLayout, Header, MenuItem} from "@/components"
import classnames from "classnames"
import {MenuUnfoldOutlined, MenuFoldOutlined} from "@ant-design/icons"
import Footer from "./Footer"
import ProLayout from "@ant-design/pro-layout"
import {MenuDataItem} from "@ant-design/pro-layout/lib/typings"
import renderRouter, {defaultRoutes} from "./Router"
import {AddSongList} from "@/components/Header/components"
import {IState} from "typings"
import {useBoolean} from "ahooks"
import {IPlayList} from "umi"
import { Outlet } from 'umi'
import styles from "./index.scss"

const CONFIG = {
  input: {
    autoComplete: "off"
  },
  locale: zh_cn
}
interface IGlobalContext {
  reloadMenu?: () => void
}
export const GlobalContext = createContext<IGlobalContext>({
  reloadMenu: undefined
})
const BasicLayout: FC = () => {
  const dispatch = useDispatch()
  const {userModel, songInfoModel, loading} = useSelector<IState, IState>((state) => state)
  const {userInfo, userId} = userModel
  const {showPlayRecord} = songInfoModel
  const [collapsed, {toggle}] = useBoolean(false)
  const {pathname} = useLocation()

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

  const request = async (_: Record<string, any>, defaultMenuData: MenuDataItem[]) => {
    try {
      const Ret: IPlayList | any = await dispatch({
        type: userId ? "userModel/getPlayList" : "userModel/getUserInfo"
      })
      return renderRouter(defaultMenuData, Ret.creator, Ret.favorite)
    } catch (error) {
      throw error
    }
  }

  useEffect(() => {
    dispatch({
      type: "userModel/getUserInfo"
    })
  }, [])

  return (
    <ConfigProvider {...CONFIG}>
      <ProLayout
        actionRef={actionRef}
        fixSiderbar
        collapsed={collapsed}
        collapsedButtonRender={false}
        title={false}
        onCollapse={toggle}
        headerTheme="light"
        route={defaultRoutes}
        menu={{request, loading: loading.effects["userModel/getUserInfo"]}}
        siderWidth={300}
        headerHeight={65}
        className={classnames(styles.home, {[styles._homeDiff]: pathname === "/mv-detail"})}
        location={{pathname}}
        menuHeaderRender={() => {
          if (collapsed) {
            return <Avatar src={Object.keys(userInfo).length && userInfo.profile.avatarUrl} />
          }
          return <img style={{height: 65}} src={require("../assets/home.png")}></img>
        }}
        menuItemRender={(item, dom) => (
          <MenuItem reload={actionRef?.current?.reload} menuItem={item}>
            {dom}
          </MenuItem>
        )}
        onMenuHeaderClick={() => history.push("/personal-recommendation")}
        headerRender={() => (
          <Header>
            <div onClick={() => toggle(!collapsed)} className={styles.collapsed}>
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </div>
            <AddSongList reload={actionRef?.current?.reload} />
          </Header>
        )}
        footerRender={() => <Footer />}>
        <GlobalContext.Provider value={{reloadMenu: actionRef.current?.reload}}>
          <Outlet/>
          {pathname !== "/mv-detail" && <PlayerLayout />}
          <Drawer
            className={styles.drawer}
            placement="right"
            bodyStyle={{paddingTop: 18}}
            visible={showPlayRecord}
            width={640}
            onClose={onClose}
            getContainer={false}>
            <PlayRecord />
          </Drawer>
        </GlobalContext.Provider>
      </ProLayout>
    </ConfigProvider>
  )
}

export default BasicLayout
