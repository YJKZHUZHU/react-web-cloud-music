/** @format */

import React, {FC} from "react"
import {CaretDownOutlined, UserOutlined} from "@ant-design/icons"
import {Avatar, Popover, message} from "antd"
import {useHistory, useSelector} from "umi"
import {useBoolean, useRequest} from "ahooks"
import API from "@/api"
import classnames from "classnames"
import {UserContent,Search, AddSongList} from "./components"
import {IState} from "typings"
import styles from "./index.scss"

const Header: FC = ({children}) => {
  const history = useHistory()
  const {userModel} = useSelector((state: IState) => state)
  const {loginStatus, userInfo} = userModel
  const [visible, {setFalse: setVisibleFalse, toggle: visibleToggle}] = useBoolean(false)
  const [signIn, {setTrue: setSignInTrue}] = useBoolean(false)
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
      {children}
      <Search />
      <AddSongList />
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
          overlayClassName={styles.userPop}
          // getPopupContainer={(): any => document.getElementsByClassName("_userInfoPop")[0]}
          trigger="click">
          <div className={styles.user}>
            <Avatar
              src={userInfo?.profile && userInfo?.profile?.avatarUrl}
              icon={<UserOutlined />}
            />
            <i className={styles.name}>{userInfo.profile && userInfo.profile.nickname}</i>
            <CaretDownOutlined className={styles.icon} />
          </div>
        </Popover>
      ) : (
        <div className={styles.user} onClick={() => history.push("/login")}>
          <Avatar
            src={Object.keys(userInfo).length && userInfo?.profile.avatarUrl}
            icon={<UserOutlined />}
          />
          <i className={styles.name}>未登录</i>
        </div>
      )}
    </header>
  )
}

export default Header
