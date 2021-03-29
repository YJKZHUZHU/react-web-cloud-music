/** @format */

import React, {FC, useEffect, useState, useCallback} from "react"
import {Drawer, Avatar, message} from "antd"
import {useDispatch, useSelector, useLocation, Link, useHistory} from "umi"
import {PlayRecord, PlayerLayout, Header} from "@/components"
import Menu from "@/layouts/Menu"
import {AntDesignOutlined, SmileOutlined} from "@ant-design/icons"
import Footer from "./Footer"
import type {ProSettings} from "@ant-design/pro-layout"
import ProLayout, {PageContainer, SettingDrawer} from "@ant-design/pro-layout"
import renderRouter from "./Router"
import {IState} from "typings"
import {MenuDataItem} from "@ant-design/pro-layout/lib/typings"
import styles from "./index.scss"

const HomeLayout: FC = ({children}) => {
  const dispatch = useDispatch()
  const {pathname} = useLocation()
  const history = useHistory()
  const {loginStatus, playList} = useSelector((state: IState) => state.userModel)
  const {creator, favorite} = playList
  const {showPlayRecord, songObj} = useSelector((state: IState) => state.songInfoModel)

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
    console.log(favorite)
  }, [])

  return (
    <ProLayout
      fixSiderbar
      title={false}
      route={renderRouter(creator, favorite)}
      siderWidth={300}
      headerHeight={65}
      className={styles.home}
      location={{pathname}}
      logo={<img src={require("../assets/home.png")}></img>}
      menuItemRender={(item, dom) => <a onClick={() => history.push(item.path || "")}>{dom}</a>}
      onMenuHeaderClick={() => history.push("/")}
      headerRender={() => <Header />}
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
