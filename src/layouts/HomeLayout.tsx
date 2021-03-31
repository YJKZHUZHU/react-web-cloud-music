/** @format */

import React, {FC, useEffect, useState, useCallback} from "react"
import {Drawer, Avatar, message} from "antd"
import {useDispatch, useSelector, useLocation, history, useHistory} from "umi"
import {PlayRecord, PlayerLayout, Header} from "@/components"
import classnames from 'classnames'
import {
  AntDesignOutlined,
  SmileOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from "@ant-design/icons"
import Footer from "./Footer"
import type {ProSettings} from "@ant-design/pro-layout"
import ProLayout, {PageContainer, SettingDrawer} from "@ant-design/pro-layout"
import renderRouter from "./Router"
import {IState} from "typings"
import {MenuDataItem} from "@ant-design/pro-layout/lib/typings"
import styles from "./index.scss"
import {useBoolean} from "ahooks"


const HomeLayout: FC = ({children}) => {
  const dispatch = useDispatch()
  const {pathname} = useLocation()
  const history = useHistory()

  const {loginStatus, playList, userInfo} = useSelector((state: IState) => state.userModel)
  const {creator, favorite} = playList
  const {showPlayRecord, songObj} = useSelector((state: IState) => state.songInfoModel)
  const [collapsed, {setFalse, setTrue, toggle}] = useBoolean(false)

  console.log(userInfo)

  const onClose = () => {
    dispatch({
      type: "songInfoModel/setShowPlayRecord",
      payload: {
        showPlayRecord: false
      }
    })
  }

  useEffect(() => {
    dispatch({
      type: "userModel/getUserInfo"
    })
  }, [])

  return (
    <ProLayout
      fixSiderbar
      collapsed={collapsed}
      collapsedButtonRender={false}
      title={false}
      onCollapse={toggle}
      headerTheme="light"
      route={renderRouter(creator, favorite)}
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
      menuItemRender={(item, dom) => <a onClick={() => history.push(item.path || "")}>{dom}</a>}
      onMenuHeaderClick={() => history.push("/")}
      headerRender={() => (
        <Header>
          <div onClick={() => toggle(!collapsed)} className={styles.collapsed}>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </div>
        </Header>
      )}
      footerRender={() => <Footer />}>
      {children}
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
    </ProLayout>
  )
}

export default HomeLayout
