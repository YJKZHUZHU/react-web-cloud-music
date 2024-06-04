/** @format */

import {
  CaretDownOutlined,
  CaretRightOutlined,
  CarryOutOutlined,
  CustomerServiceOutlined,
  RightOutlined,
  SettingOutlined,
  ThunderboltOutlined,
  UserOutlined
} from "@ant-design/icons"
import {Divider, Avatar, Button, Space, Popover, message, Flex} from "antd"
import {EnumLocalStorage, getItem, login} from "@/help/cache"
import {history} from "@umijs/max"
import {useBoolean, useRequest} from "ahooks"
import {useLogout} from "@/hooks"
import {useNickName} from "@/store/login"
import {
  useAvatarUrl,
  useEventCount,
  useFollowed,
  useFolloweds,
  useFollows,
  useIsSignIn,
  useLevel,
  useVipLevel,
  useSetIsSignIn
} from "@/store/user"
import {dailySignin} from "@/api/user"
import {useState} from "react"

const UserContent = () => {
  const [visible, {setFalse: setVisibleFalse, toggle: visibleToggle}] = useBoolean(false)

  const nickName = useNickName()
  const avatarUrl = useAvatarUrl()
  const follows = useFollows()
  const eventCount = useEventCount()
  const followeds = useFolloweds()
  const isSignIn = useIsSignIn()
  const setIsSignIn = useSetIsSignIn()
  const followed = useFollowed()
  const level = useLevel()
  const vipLevel = useVipLevel()
  const runLogout = useLogout()
  const [signinLoading, setSigninLoading] = useState(false)

  const onSignIn = async () => {
    try {
      if (isSignIn) {
        return message.info("已经签到过啦")
      }
      setSigninLoading(true)
      const res = await dailySignin({type: 1})
      if (res.data.code === 200) {
        setIsSignIn(true)
        message.success(`签到成功，经验值+${res.data.point}`)
      }
      setSigninLoading(false)
    } catch (error) {
      setSigninLoading(false)
      console.log("error", error)
    }
  }

  const onLink = (path: string) => {
    setVisibleFalse()
    history.push(path)
  }

  const renderContent = () => {
    return (
      <Flex vertical>
        <Flex vertical gap={16} className=" px-[18px] pt-[12px]">
          <Flex justify="space-between">
            <Flex gap={4} align="center">
              <span className="text-[14px]">{nickName}</span>
              {vipLevel && (
                <img
                  alt=""
                  className="rounded-[16px]"
                  width={48}
                  height={16}
                  src={require(`../../../../assets/musicVip/${vipLevel}.png`)}
                />
              )}
            </Flex>
            <Button
              icon={<CarryOutOutlined />}
              size="small"
              onClick={onSignIn}
              disabled={signinLoading}>
              {isSignIn ? "已签到" : "签到"}
            </Button>
          </Flex>
          <Flex align="center" justify="space-between">
            <Flex
              vertical
              className=" cursor-pointer"
              onClick={() => onLink(`/care/dynamic/${getItem(EnumLocalStorage.userId)}`)}>
              <span className="self-center">{eventCount}</span>
              <span>动态</span>
            </Flex>
            <Divider type="vertical" />
            <Flex
              vertical
              className=" cursor-pointer"
              onClick={() => onLink(`/care/follows/${getItem(EnumLocalStorage.userId)}`)}>
              <span className="self-center">{follows}</span>
              <span>关注</span>
            </Flex>
            <Divider type="vertical" />
            <Flex
              vertical
              className=" cursor-pointer"
              onClick={() => onLink(`/care/fan/${getItem(EnumLocalStorage.userId)}`)}>
              <span className="self-center">{followeds}</span>
              <span>粉丝</span>
            </Flex>
          </Flex>
          <Divider style={{margin: 0}} />
        </Flex>
        <Flex vertical gap={0}>
          <Flex vertical>
            <Flex
              className="px-[18px] h-[30px] cursor-pointer hover:bg-[#ecedee]"
              align="center"
              justify="space-between">
              <Flex gap={4}>
                <CustomerServiceOutlined />
                <span className="text-[14px]">会员中心</span>
              </Flex>
              <span>{followed ? "已订购" : "未订购"}</span>
            </Flex>
            <Flex
              className="px-[18px] h-[30px] cursor-pointer hover:bg-[#ecedee]"
              align="center"
              justify="space-between">
              <Flex gap={4}>
                <ThunderboltOutlined />
                <span className="text-[14px]">会员等级</span>
              </Flex>
              <span>LV.{level}</span>
            </Flex>
            <Flex
              className="px-[18px] h-[30px] cursor-pointer hover:bg-[#ecedee]"
              align="center"
              justify="space-between">
              <Flex gap={4}>
                <SettingOutlined />
                <span className="text-[14px]">个人信息设置</span>
              </Flex>
              <RightOutlined />
            </Flex>
          </Flex>
          <Divider style={{margin: "0"}} />
          <div
            className="px-[18px] content-center h-[30px] cursor-pointer hover:bg-[#ecedee]"
            onClick={runLogout}>
            退出登录
          </div>
        </Flex>
      </Flex>
    )
  }

  if (login())
    return (
      <Popover
        placement="right"
        open={visible}
        onOpenChange={visibleToggle}
        content={renderContent()}
        overlayStyle={{width: 300}}
        overlayInnerStyle={{padding: 0}}
        trigger="click">
        <Flex align="center" className=" cursor-pointer" gap={4}>
          <Avatar
            onClick={(e) => {
              e?.stopPropagation()
              history.push(`/homepage/${getItem(EnumLocalStorage.userId)}`)
            }}
            alt=""
            src={avatarUrl}
            icon={<UserOutlined />}
          />
          <span>{nickName || "游客"}</span>
          <CaretRightOutlined />
          {/* <CaretDownOutlined /> */}
        </Flex>
      </Popover>
    )

  return (
    <Flex onClick={() => history.push("/login")} align="center" className="cursor-pointer" gap={4}>
      <Avatar icon={<UserOutlined />} />
      <span>游客</span>
    </Flex>
  )
}

export default UserContent
