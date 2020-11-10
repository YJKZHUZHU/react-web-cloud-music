/** @format */

import React from "react"
import {
  CaretDownOutlined,
  CarryOutOutlined,
  CustomerServiceOutlined,
  DownOutlined,
  LeftOutlined,
  RightOutlined,
  SettingOutlined,
  SkinOutlined,
  ThunderboltOutlined,
  UserOutlined
} from "@ant-design/icons"
import {Divider, Avatar, Button, Popover, message, Modal} from "antd"
import {Link, history, useSelector, useDispatch, PlayModelState} from "umi"
import Draggable from "react-draggable"
import {useBoolean, useRequest} from "ahooks"
import API from "@/api"
import classnames from "classnames"
import Utils from "@/help"
import Search from "@/components/Search"
import LoginModal from "@/components/LoginModal"
import styles from "./index.scss"

const ThEME_MAP = [
  {
    theme: "黑色",
    id: "black"
  },
  {
    theme: "浅色",
    id: "shallow"
  },
  {
    theme: "红色",
    id: "red"
  }
]

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
      return message.success("签到成功")
    }
  })

  const content = (
    <div className={styles.theme}>
      {ThEME_MAP.map((item) => (
        <p className={styles.item} key={item.id} onClick={() => Utils.setTheme(item.id)}>
          <span className={classnames(styles[item.id], styles.com)} />
          <span>{item.theme}</span>
        </p>
      ))}
    </div>
  )
  const userContent = (
    <div className={styles._main}>
      <div className={styles.top}>
        <div className={styles.user}>
          <div className={styles.left}>
            <Avatar
              src={Object.keys(userInfo).length && userInfo.profile.avatarUrl}
              icon={<UserOutlined />}
            />
            <i className={styles.name}>
              {Object.keys(userInfo).length && userInfo.profile.nickname}
            </i>
          </div>
          <Button size="small" onClick={runSignin} disabled={userInfo.pcSign || signIn}>
            <CarryOutOutlined />
            {userInfo.pcSign || signIn ? "已签到" : "签到"}
          </Button>
        </div>
        <div className={styles.attention}>
          <p className={styles.item} onClick={() => onRoute("/care/dynamic")}>
            <i>{userInfo.profile && userInfo.profile.eventCount}</i>
            <em>动态</em>
          </p>
          <Divider type="vertical" className={styles.divider} />
          <p className={styles.item} onClick={() => onRoute("/care/follows")}>
            <i>{userInfo.profile && userInfo.profile.follows}</i>
            <em>关注</em>
          </p>
          <Divider type="vertical" className={styles.divider} />
          <p className={styles.item} onClick={() => onRoute("/care/fan")}>
            <i>{userInfo.profile && userInfo.profile.followeds}</i>
            <em>粉丝</em>
          </p>
        </div>
      </div>
      <Divider className={styles.divider} />
      <div className={styles.middle}>
        <ul>
          <li className={styles.item}>
            <p>
              <CustomerServiceOutlined />
              <em>会员中心</em>
            </p>
            <p>{userInfo.profile && userInfo.profile.followed ? "已订购" : "未订购"}</p>
          </li>
          <li className={styles.item}>
            <p>
              <ThunderboltOutlined />
              <em>会员等级</em>
            </p>
            <p className={styles.level}>
              {/*<i/>*/}
              <em>LV.7</em>
            </p>
          </li>
          <li className={styles.item}>
            <p>
              <SettingOutlined />
              <em>个人信息设置</em>
            </p>
            <p>
              <RightOutlined />
            </p>
          </li>
        </ul>
      </div>
      <Divider className={styles.divider} />
      <div className={styles.bottom} onClick={runLogout}>
        退出登录
      </div>
    </div>
  )

  return (
    <header className={styles._header}>
      <h1 className={styles.logo}>
        <Link to="/" />
      </h1>
      <div className={styles.routerBtn}>
        {showPlayer ? (
          <DownOutlined
            onClick={() =>
              dispatch({type: "playmodel/setShowPlayer", payload: {showPlayer: false}})
            }
            className={styles.down}
          />
        ) : (
          <Button.Group>
            <Button onClick={() => history.goBack()}>
              <LeftOutlined />
            </Button>
            <Button onClick={() => history.go(1)}>
              <RightOutlined />
            </Button>
          </Button.Group>
        )}
      </div>
      <div className="_search">
        <Search />
      </div>
      {loginStatus ? (
        <Popover
          visible={visible}
          onVisibleChange={visibleToggle}
          content={userContent}
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
      <Popover
        className={styles.skin}
        content={content}
        title="选择您喜欢的主题"
        trigger="click"
        overlayClassName={styles.themePop}
        getPopupContainer={(): any => document.getElementsByClassName("_changeSkin")[0]}>
        <SkinOutlined className={classnames(styles.skin, "_changeSkin")} />
      </Popover>
      <Modal
        visible={loginVisible}
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
        onCancel={() => loginToggle(false)}
        modalRender={(modal) => <Draggable disabled={disabled}>{modal}</Draggable>}
        footer={null}>
        <LoginModal callback={(loginVisible) => loginToggle(loginVisible)} />
      </Modal>
    </header>
  )
}

export default Header
