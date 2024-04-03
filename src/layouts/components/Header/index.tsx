/** @format */

import React, { FC, useMemo } from "react"
import { CaretDownOutlined, UserOutlined } from "@ant-design/icons"
import { Avatar, Popover, message, Space, Button, Flex, Tag } from "antd"
import { history, useSelector } from "@umijs/max"
import { useBoolean, useRequest } from "ahooks"
import API from "@/api"
import { UserContent, Search } from "./components"
import { IState } from "typings"
import styles from "./index.scss"
import classNames from "classnames"
import { useNickName } from "@/store/login"
import { useAvatarUrl } from "@/store/user"
import { login } from "@/help/cache"

const tagsData = [
  {
    label: '个性推荐',
    path: '/',
    key: '1'
  },
  {
    label: '歌单',
    path: '/',
    key: '2'
  },
  {
    label: '主播电台',
    path: '/',
    key: '3'
  }, {
    label: '排行榜',
    path: '/',
    key: '4'
  },
  {
    label: '歌手',
    path: '/',
    key: '5'
  },
  {
    label: '最新音乐',
    path: '/',
    key: '6'
  }
]

const Header: FC = ({ children }) => {
  const [selectedTag, setSelectedTag] = React.useState<string>('1');
  const nickName = useNickName()
  const avatarUrl = useAvatarUrl()
  const { userModel } = useSelector((state: IState) => state)
  const { loginStatus, userInfo } = userModel
  const [visible, { setFalse: setVisibleFalse, toggle: visibleToggle }] = useBoolean(false)
  const [signIn, { setTrue: setSignInTrue }] = useBoolean(false)
  const onRoute = (path: string) => {
    setVisibleFalse()
    history.push(path)
  }

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

  const childrenArr = React.Children.toArray(children)

  const handleChange = (tag: any, checked: boolean) => {
    if (tag.key === selectedTag) return
    setSelectedTag(tag.key)
  };

  return (
    <header className={classNames(styles._header, 'min-h-[84px] max-h-[160px] bg-[#ffffff]')}>
      <div className="w-[220px] ml-[40px]"><img onClick={() => history.push("/personal-recommendation")} width={144} src={require("../../../assets/home.png")}></img></div>
      <div className="flex-1 flex flex-col">
        <div className="h-[84px] flex items-center">
          <div className="flex items-center gap-[8px]">
            <div className="text-[#363D62] text-[16px]">个人设置</div>
            <div className="text-[#363D62] text-[16px]">主题设置</div>
            <div className="text-[#363D62] text-[16px]">新建歌单</div>
          </div>
          <Search />
          <div className="flex items-center gap-[2px]">
            <Avatar
              size={40}
              src={avatarUrl}
              icon={<UserOutlined />}
            />
            <i className={styles.name}>{nickName || '游客'}</i>
          </div>
        </div>
        <div className="h-[74px]">
          <Flex gap={4} wrap="nowrap" align="center">
            {tagsData.map<React.ReactNode>((tag) => (
              <Tag.CheckableTag
                key={tag.key}
                checked={tag.key === selectedTag}
                onChange={(checked) => handleChange(tag, checked)}
              >
                {tag.label}
              </Tag.CheckableTag>
            ))}
          </Flex>
        </div>
      </div>


      {/* {login() ? (
        <Popover
          open={visible}
          onOpenChange={visibleToggle}
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
              src={avatarUrl}
              icon={<UserOutlined />}
            />
            <i className={styles.name}>{nickName || '游客'}</i>
            <CaretDownOutlined className={styles.icon} />
          </div>
        </Popover>
      ) : (
        <div className={styles.user} onClick={() => history.push("/login")}>
          <Avatar
            // src={Object.keys(userInfo).length && userInfo?.profile.avatarUrl}
            icon={<UserOutlined />}
          />
          <i className={styles.name}>游客</i>
        </div>
      )} */}
    </header>
  )
}

export default Header
