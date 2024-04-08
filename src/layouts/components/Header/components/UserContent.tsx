/** @format */

import React, { FC } from "react"
import {
  CaretDownOutlined,
  CarryOutOutlined,
  CustomerServiceOutlined,
  RightOutlined,
  SettingOutlined,
  ThunderboltOutlined,
  UserOutlined
} from "@ant-design/icons"
import { Divider, Avatar, Button, Space, Popover, message } from "antd"
import styles from "../index.scss"
import { login } from "@/help/cache"
import { history, useSelector } from "@umijs/max"
import { useBoolean, useRequest } from "ahooks"
import { useNickName } from "@/store/login"
import {
  useAvatarUrl,
  useEventCount,
  useFollowed,
  useFolloweds,
  useFollows,
  useLevel,
  useSign,
  useVipLevel
} from "@/store/user"
import API from "@/api"
import classNames from "classnames"

const UserContent = () => {
  const [signIn, { setTrue: setSignInTrue }] = useBoolean(false)

  const [visible, { setFalse: setVisibleFalse, toggle: visibleToggle }] = useBoolean(false)

  const nickName = useNickName()
  const avatarUrl = useAvatarUrl()
  const follows = useFollows()
  const eventCount = useEventCount()
  const followeds = useFolloweds()
  const sign = useSign()
  const followed = useFollowed()
  const level = useLevel()
  const vipLevel = useVipLevel()

  const { run: runLogout } = useRequest(() => API.logout({ loading: true }), {
    manual: true,
    onSuccess: (response: any) => {
      if (response.code !== 200) return message.info("服务器开小差了哦。。")
      setVisibleFalse()
      message.success("退出成功")
      window.location.reload()
    }
  })

  const { run: runSignin } = useRequest(() => API.dailySignIn({ type: 1 }), {
    manual: true,
    onSuccess: (response) => {
      if (response.code !== 200) return message.info("已经签到过了哦")
      setSignInTrue()
      setVisibleFalse()
      return message.success("签到成功")
    }
  })

  const onLink = (path: string) => {
    setVisibleFalse()
    history.push(path)
  }

  const renderContent = () => {
    return (
      <div className={classNames(styles._main, 'flex-1')}>
        <div className={styles.top}>
          <div className={styles.user}>
            <Space>

              <i className={styles.name}>{nickName}</i>
              {vipLevel && <img
                className="rounded-[16px]"
                width={48}
                height={16}
                src={require(`../../../../assets/musicVip/${vipLevel}.png`)}
              />}

            </Space>

            <Button
              icon={<CarryOutOutlined />}
              size="small"
              onClick={runSignin}
              disabled={sign || signIn}>
              {sign || signIn ? "已签到" : "签到"}
            </Button>
          </div>
          <div className={styles.attention}>
            <div className=" cursor-pointer" onClick={() => onLink("/care/dynamic")}>
              <Space direction="vertical" size={5} className={styles.link}>
                <i>{eventCount}</i>
                <em>动态</em>
              </Space>
            </div>
            <Divider type="vertical" className={styles.divider} />
            <div className=" cursor-pointer" onClick={() => onLink("/care/follows")}>
              <Space direction="vertical" size={5} className={styles.link}>
                <i>{follows}</i>
                <em>关注</em>
              </Space>
            </div>
            <Divider type="vertical" className={styles.divider} />
            <div className=" cursor-pointer" onClick={() => onLink("/care/fan")}>
              <Space direction="vertical" size={5} className={styles.link}>
                <i>{followeds}</i>
                <em>粉丝</em>
              </Space>
            </div>
          </div>
        </div>
        <Divider className={styles.divider} />
        <div className={styles.middle}>
          <ul>
            <li className={styles.item}>
              <Space>
                <CustomerServiceOutlined />
                <em>会员中心</em>
              </Space>
              <span>{followed ? "已订购" : "未订购"}</span>
            </li>
            <li className={styles.item}>
              <Space>
                <ThunderboltOutlined />
                <em>会员等级</em>
              </Space>
              <em className={styles.level}>LV.{level}</em>
            </li>
            <li className={styles.item}>
              <Space>
                <SettingOutlined />
                <em>个人信息设置</em>
              </Space>
              <RightOutlined />
            </li>
          </ul>
        </div>
        <Divider className={styles.divider} />
        <div className={styles.bottom} onClick={runLogout}>
          退出登录
        </div>
      </div>
    )
  }

  if (login())
    return (
      <Popover
        open={visible}
        onOpenChange={visibleToggle}
        content={renderContent()}
        overlayClassName={styles.userPop}
        trigger="click">
        <div className={styles.user}>
          <Avatar src={avatarUrl} icon={<UserOutlined />} />
          <i className={styles.name}>{nickName || "游客"}</i>
          <CaretDownOutlined className={styles.icon} />
        </div>
      </Popover>
    )

  return (
    <div className={styles.user} onClick={() => history.push("/login")}>
      <Avatar icon={<UserOutlined />} />
      <i className={styles.name}>游客</i>
    </div>
  )
}

export default UserContent
