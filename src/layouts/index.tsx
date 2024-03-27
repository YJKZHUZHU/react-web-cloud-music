/** @format */

import React, { FC, useEffect, useRef, createContext } from "react"
import zh_cn from "antd/lib/locale/zh_CN"
import { Drawer, Avatar, ConfigProvider, ConfigProviderProps } from "antd"
import { useDispatch, useSelector, useLocation, history, Outlet } from "@umijs/max"
import { PlayRecord, PlayerLayout, Header, MenuItem } from "@/components"
import classnames from "classnames"
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons"
import Footer from "./Footer"
import ProLayout, { MenuDataItem } from "@ant-design/pro-layout"
// import {MenuDataItem} from "@ant-design/pro-layout/lib/typings"
import renderRouter, { defaultRoutes } from "./Router"
import { AddSongList } from "@/components/Header/components"
import { IState } from "typings"
import { useBoolean } from "ahooks"
// import {IPlayList} from "@umijs/max"
import styles from "./index.scss"
import { IPlayList } from "@/models/userStore"

const CONFIG: ConfigProviderProps = {
  input: {
    autoComplete: "off"
  },
  locale: zh_cn,
  theme: {
    token: {
      colorPrimary: '#00a799', // 全局主色
      colorLink: '#00a799', // 链接色
      colorSuccess: '#52c41a', // 成功色
      colorWarning: '#faad14', // 警告色
      colorError: '#f5222d', // 错误色
      fontSize: 14, // 主字号
      colorTextHeading: '#00A799', // 标题色
      colorText: '#00A799', // 主文本色
      colorTextSecondary: 'rgba(0, 0, 0, 0.45)', // 次文本色
      colorTextDisabled: '#00A799', // 失效色
      borderRadius: 4, // 组件/浮层圆角
      colorBorder: '#d9d9d9', // 边框色
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)', // 浮层阴影
    }
  }
}
interface IGlobalContext {
  reloadMenu?: () => void
}
export const GlobalContext = createContext<IGlobalContext>({
  reloadMenu: undefined
})
const BasicLayout: FC = () => {
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
    <div style={{
      height: '100vh',
      overflow: 'auto',
    }}>
      <ConfigProvider {...CONFIG}>
        <ProLayout
          token={{
            header: {
              heightLayoutHeader: 65
            },
            sider: {
              // colorMenuItemDivider: '#ffffff'
            }
          }}
          disableMobile
          layout="mix"
          actionRef={actionRef}
          fixSiderbar={true}
          collapsed={collapsed}
          collapsedButtonRender={false}
          title={false}
          onCollapse={toggle}
          theme="light"
          breakpoint={false}
          route={defaultRoutes}
          menu={{ request, loading: loading.effects["userModel/getUserInfo"], autoClose: false }}
          siderWidth={300}
          className={classnames(styles.home, { [styles._homeDiff]: pathname === "/mv-detail" })}
          location={{ pathname }}
          menuHeaderRender={false}
          menuItemRender={(item, dom) => (
            <MenuItem reload={actionRef?.current?.reload} menuItem={item}>
              {dom}
            </MenuItem>
          )}
          contentStyle={{
            // overflowY: 'scroll'
          }}

          // onMenuHeaderClick={() => history.push("/personal-recommendation")}
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
            <Drawer
              rootClassName={styles.drawer}
              placement="right"
              style={{ paddingTop: 18 }}
              open={showPlayRecord}
              width={640}
              onClose={onClose}
              getContainer={false}>
              <PlayRecord />
            </Drawer>
          </GlobalContext.Provider>
        </ProLayout>
      </ConfigProvider>
    </div>

  );
}

export default BasicLayout
