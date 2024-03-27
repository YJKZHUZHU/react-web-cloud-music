/** @format */

import React, { useEffect } from "react"
import { useRequest } from "ahooks"
import { useQuery } from '@/hooks'
import API from "@/api"
import { Space, Avatar } from "antd"
import { CustomerServiceOutlined, ManOutlined, WomanOutlined } from "@ant-design/icons"

interface IAllAuthTypes {
  desc: string
  tags: any
  type: number
  [props: string]: any
}
interface IAvatarDetail {
  userType: any
  identityLevel: number
  identityIconUrl: string
  [props: string]: any
}

interface IProfile {
  accountStatus: number
  allAuthTypes: IAllAuthTypes[]
  allSubscribedCount: number
  artistIdentity: any[]
  authStatus: number
  authority: number
  avatarDetail: IAvatarDetail
  avatarImgId: number
  avatarImgIdStr: string
  avatarImgId_str: string
  avatarUrl: string
  backgroundImgId: number
  backgroundImgIdStr: string
  backgroundUrl: string
  birthday: number
  blacklist: boolean
  cCount: number
  city: number
  createTime: number
  defaultAvatar: boolean
  description: string
  detailDescription: string
  djStatus: number
  eventCount: number
  expertTags: any
  experts: any
  followMe: boolean
  followTime: any
  followed: boolean
  followeds: number
  follows: number
  gender: number
  mainAuthType: IAllAuthTypes
  mutual: boolean
  newFollows: number
  nickname: string
  playlistBeSubscribedCount: number
  playlistCount: number
  province: number
  remarkName: any
  sCount: number
  sDJPCount: number
  signature: string
  userId: number
  userType: number
  vipType: number
  [props: string]: any
}

interface IBindings {
  bindingTime: number
  expired: boolean
  expiresIn: number
  id: number
  refreshTime: number
  tokenJsonStr: any
  type: number
  url: string
  userId: number
  [props: string]: any
}

interface IIdentify {
  imageUrl: string
  imageDesc: string
  actionUrl: any
  [props: string]: any
}

interface IUserInfo {
  adValid: boolean
  bindings: IBindings[]
  code: number
  createDays: number
  createTime: number
  identify: IIdentify
  level: number
  listenSongs: number
  mobileSign: boolean
  pcSign: boolean
  peopleCanSeeMyPlayRecord: boolean
  profile: IProfile
  userPoint: {
    balance: number
    blockBalance: number
    status: number
    updateTime: number
    userId: number
    version: number
    [props: string]: any
  }
  [props: string]: any
}

const HomePage = () => {
  const { uid } = useQuery()
  const { data, run, loading } = useRequest<IUserInfo>(() => API.useInfo({ uid }), {
    manual: true
  })


  useEffect(() => {
    run()
  }, [])
  return (
    <div>
      <Space>
        <Space size={20}>
          <Avatar
            icon={<CustomerServiceOutlined />}
            size={200}
            alt="资源加载异常"
            src={`${data?.profile?.avatarUrl}?param=200y200`}
          />
        </Space>
        <Space>
          <Space>
            <span>{data?.profile?.nickname}</span>
            <span></span>
          </Space>

          <Space>
            <span>
              lv{data?.level}
              {data?.profile?.gender === 1 ? <ManOutlined /> : null}
              {data?.profile?.gender === 2 ? <WomanOutlined /> : null}
            </span>
          </Space>
        </Space>
      </Space>
    </div>
  )
}

export default HomePage
