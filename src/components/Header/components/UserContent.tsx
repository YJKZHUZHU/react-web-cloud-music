/** @format */

import React, {FC} from "react"
import {
  CarryOutOutlined,
  CustomerServiceOutlined,
  RightOutlined,
  SettingOutlined,
  ThunderboltOutlined,
  UserOutlined
} from "@ant-design/icons"
import {Divider, Avatar, Button, Space} from "antd"
import styles from "../index.scss"

interface IUserContent {
  userInfo: {[key: string]: any}
  runSignin: () => void
  signIn: boolean
  onLink: (path: string) => void
  runLogout: () => void
}

const UserContent: FC<IUserContent> = (props) => {
  const {userInfo, runSignin, signIn, onLink, runLogout} = props
  return (
    <div className={styles._main}>
      <div className={styles.top}>
        <div className={styles.user}>
          <Space>
            <Avatar
              src={Object.keys(userInfo).length && userInfo.profile.avatarUrl}
              icon={<UserOutlined />}
            />
            <i className={styles.name}>
              {Object.keys(userInfo).length && userInfo.profile.nickname}
            </i>
          </Space>

          <Button size="small" onClick={runSignin} disabled={userInfo.pcSign || signIn}>
            <CarryOutOutlined />
            {userInfo.pcSign || signIn ? "已签到" : "签到"}
          </Button>
        </div>
        <div className={styles.attention}>
          <div onClick={() => onLink("/care/dynamic")}>
            <Space direction="vertical" size={5} className={styles.link}>
              <i>{userInfo.profile && userInfo.profile.eventCount}</i>
              <em>动态</em>
            </Space>
          </div>
          <Divider type="vertical" className={styles.divider} />
          <div onClick={() => onLink("/care/follows")}>
            <Space direction="vertical" size={5} className={styles.link}>
              <i>{userInfo.profile && userInfo.profile.follows}</i>
              <em>关注</em>
            </Space>
          </div>
          <Divider type="vertical" className={styles.divider} />
          <div onClick={() => onLink("/care/fan")}>
            <Space direction="vertical" size={5} className={styles.link}>
              <i>{userInfo.profile && userInfo.profile.followeds}</i>
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
            <span>{userInfo.profile && userInfo.profile.followed ? "已订购" : "未订购"}</span>
          </li>
          <li className={styles.item}>
            <Space>
              <ThunderboltOutlined />
              <em>会员等级</em>
            </Space>
            <em className={styles.level}>LV.7</em>
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

export default UserContent
