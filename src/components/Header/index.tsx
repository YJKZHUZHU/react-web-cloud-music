/** @format */

import React from "react"
import {
  CaretDownOutlined,
  DownOutlined,
  LeftOutlined,
  RightOutlined,
  UserOutlined
} from "@ant-design/icons"
import {Avatar, Popover, message, Modal, Space} from "antd"
import {Link, history, useSelector, useDispatch, PlayModelState} from "umi"
import Draggable from "react-draggable"
import {useBoolean, useRequest} from "ahooks"
import API from "@/api"
import classnames from "classnames"
import UserContent from "./components/userContent"
import Search from "./components/Search"
import Login from "./components/Login"
import styles from "./index.scss"

const Header = () => {
  const dispatch = useDispatch()
  const {loginStatus, userInfo} = useSelector((state: any) => state.userModel)
  const [visible, {setFalse: setVisibleFalse, toggle: visibleToggle}] = useBoolean(false)
  const [signIn, {setTrue: setSignInTrue}] = useBoolean(false)
  const [loginVisible, {toggle: loginToggle}] = useBoolean(false)
  const [disabled, {setTrue, setFalse}] = useBoolean(false)
  const {showPlayer} = useSelector((state: any): PlayModelState => state.playmodel)
  const onRoute = (path: string) => {
    setVisibleFalse()
    history.push(path)
  }

  const {run: runLogout} = useRequest(() => API.logout({loading: true}), {
    manual: true,
    onSuccess: (response: any) => {
      if (response.code !== 200) return message.info("服务器开小差了哦。。")
      setVisibleFalse()
      message.success("退出成功")
      window.location.reload()
    }
  })

  const {run: runSignin} = useRequest(() => API.dailySignIn({type: 1}), {
    manual: true,
    onSuccess: (response) => {
      if (response.code !== 200) return message.info("已经签到过了哦")
      setSignInTrue()
      setVisibleFalse()
      return message.success("签到成功")
    }
  })

  return (
    <header className={styles._header}>
      <Link to="/" className={styles.logo}>
        <img src={require("../../assets/home.png")}></img>
      </Link>
      <div className={styles.routerBtn}>
        {showPlayer ? (
          <DownOutlined
            onClick={() =>
              dispatch({type: "playmodel/setShowPlayer", payload: {showPlayer: false}})
            }
            className={styles.down}
          />
        ) : (
          <Space size={20}>
            <LeftOutlined onClick={() => history.goBack()} />
            <RightOutlined onClick={() => history.go(1)} />
          </Space>
        )}
      </div>
      <div className={classnames(styles.search, "_search")}>
        <Search />
      </div>
      {loginStatus ? (
        <Popover
          visible={visible}
          onVisibleChange={visibleToggle}
          content={
            <UserContent
              userInfo={userInfo}
              runLogout={runLogout}
              runSignin={runSignin}
              signIn={signIn}
              onLink={onRoute}
            />
          }
          overlayClassName={classnames(styles.userPop, "_userPop")}
          getPopupContainer={(): any => document.getElementsByClassName("_userInfoPop")[0]}
          trigger="click">
          <div className={classnames(styles.user, "_userInfoPop")}>
            <Avatar src={userInfo.profile && userInfo.profile.avatarUrl} icon={<UserOutlined />} />
            <i className={styles.name}>{userInfo.profile && userInfo.profile.nickname}</i>
            <CaretDownOutlined className={styles.icon} />
          </div>
        </Popover>
      ) : (
        <div className={classnames(styles.user, "_userInfoPop")} onClick={() => loginToggle(true)}>
          <Avatar
            src={Object.keys(userInfo).length && userInfo.profile.avatarUrl}
            icon={<UserOutlined />}
          />
          <i className={styles.name}>未登录</i>
        </div>
      )}
      <Modal
        visible={loginVisible}
        width={350}
        title={
          <div
            style={{
              width: "100%",
              cursor: "move"
            }}
            onMouseOver={setFalse}
            onMouseOut={setTrue}>
            账号登录
          </div>
        }
        maskClosable={false}
        onCancel={() => loginToggle(false)}
        modalRender={(modal) => <Draggable disabled={disabled}>{modal}</Draggable>}
        footer={null}>
        <Login callback={(loginVisible) => loginToggle(loginVisible)} />
      </Modal>
    </header>
  )
}

export default Header
