/** @format */

import React, {useEffect, useMemo, useState} from "react"

import {useParams, history} from "@umijs/max"
import API from "@/api"
import {userDetail, vipGrowthpoint, userPlaylist} from "@/api/user"
import {Space, Avatar, Flex, Divider, Spin, Skeleton, Button, message} from "antd"
import {
  CaretRightOutlined,
  CustomerServiceOutlined,
  ManOutlined,
  PlusOutlined,
  UserOutlined,
  WomanOutlined
} from "@ant-design/icons"
import {ISongListItem, IUserInfo, IVipInfo, useUserInfo, useVipInfo} from "@/store/user"
import {EnumLocalStorage, getItem} from "@/help/cache"
import {Empty, Image} from "@/components"
import man from "@/assets/man.png"
import woman from "@/assets/woman.png"
import Utils from "@/help"
import {follow} from "@/api/user"
import {PlayListItem} from "./components"

export default function () {
  const {uid} = useParams() as {uid: string}
  console.log("uid--", uid)
  const [useDetail, setUserDetail] = useState<Partial<IUserInfo>>()
  const [loading, setLoading] = useState(false)
  const [playListLoading, setPlayListLoading] = useState(false)
  const [vipInfo, setVipInfo] = useState<Partial<IVipInfo>>()
  const userInfo = useUserInfo()
  const vipDetail = useVipInfo()
  const [isMySelf, setIsMySelf] = useState(false)
  const [playList, setPlayList] = useState<ISongListItem[]>([])

  const getPlayList = async () => {
    try {
      setPlayListLoading(true)
      const res = await userPlaylist({uid: String(uid)})
      setPlayList(res.data?.playlist)
      setPlayListLoading(false)
    } catch (error) {
      setPlayListLoading(false)
      console.log("error", error)
    }
  }

  const init = async () => {
    try {
      if (uid === getItem(EnumLocalStorage.userId)) {
        setIsMySelf(true)
        setUserDetail(userInfo)
        setVipInfo(vipDetail)
        return
      }
      setLoading(true)
      setIsMySelf(false)
      const res = await userDetail({uid})
      const vipRes = await vipGrowthpoint()
      vipRes.success && setVipInfo(vipRes.data)
      setUserDetail(res.data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log("error", error)
    }
  }

  // const onFollow = async (t: 0 | 1) => {
  //   try {
  //     const res = await follow({id: uid, t})
  //   } catch (error) {
  //     console.log("error", error)
  //   }
  // }

  const vipLevel = vipInfo?.userLevel?.level

  useEffect(() => {
    uid && init()
    uid && getPlayList()
  }, [uid])

  const useCreatorSongList = useMemo(() => {
    return playList.filter((item) => !item.subscribed)
  }, [playList])

  const useFavoriteSongList = useMemo(() => {
    return playList.filter((item) => item.subscribed)
  }, [playList])

  const renderList = (source: ISongListItem[]) => {
    if (source.length === 0 && !playListLoading) {
      return <Empty />
    }
    return (
      <Flex wrap gap={21}>
        {source.map((item) => (
          <PlayListItem data={item} key={item.id} />
        ))}
      </Flex>
    )
  }

  console.log("useDetail", useDetail, vipInfo)

  return (
    <Flex vertical gap={12} flex={1}>
      <Flex gap={24} className=" bg-[#ffffff] rounded-[20px] p-[16px]" flex={1}>
        {loading ? (
          <Flex gap={24} flex={1}>
            <Skeleton.Avatar active size={150} />
            <Skeleton className="flex-1" active paragraph={{rows: 3, width: "80%"}} />
          </Flex>
        ) : (
          <>
            <Image
              src={useDetail?.profile?.avatarUrl}
              width={150}
              height={150}
              size={[150, 150]}
              className="w-[150px] h-[150px] rounded-[50%]"
            />

            <Flex flex={1} vertical gap={12}>
              <span className="text-[20px]">{useDetail?.profile?.nickname}</span>
              <Flex align="center" gap={6}>
                <Flex align="center" flex={1}>
                  {vipLevel && (
                    <img
                      alt=""
                      className="rounded-[16px]"
                      width={48}
                      height={16}
                      src={require(`../../assets/musicVip/${vipLevel}.png`)}
                    />
                  )}
                  <div className=" bg-[#EBECEC] text-[#262626] text-[14px] px-[8px] py-[2px]  rounded-[20px] flex justify-center items-center">
                    Lv{useDetail?.level}
                  </div>
                  <img width={16} alt="" src={useDetail?.profile?.gender === 1 ? man : woman} />
                </Flex>

                <Button
                  onClick={() => message.info("开发中...")}
                  type="primary"
                  icon={<PlusOutlined />}>
                  关注
                </Button>
              </Flex>
              <Divider className="!my-0" />
              <Flex gap={12}>
                <Flex
                  vertical
                  gap={8}
                  align="center"
                  onClick={() =>
                    history.push(
                      `/care/dynamic/${useDetail?.userPoint?.userId}?nickName=${useDetail?.profile?.nickname}`
                    )
                  }>
                  <span className="text-[#262727] cursor-pointer text-[18px]">
                    {useDetail?.profile?.eventCount}
                  </span>
                  <span className="text-[#535353] hover:text-[#262626] hover:cursor-pointer">
                    动态
                  </span>
                </Flex>
                <Divider className="!h-full" type="vertical" />
                <Flex
                  vertical
                  gap={8}
                  align="center"
                  onClick={() =>
                    history.push(
                      `/care/follows/${useDetail?.userPoint?.userId}?nickName=${useDetail?.profile?.nickname}`
                    )
                  }>
                  <span className="text-[#262727] cursor-pointer text-[18px]">
                    {useDetail?.profile?.follows}
                  </span>
                  <span className="text-[#535353] hover:text-[#262626] hover:cursor-pointer">
                    关注
                  </span>
                </Flex>
                <Divider className="!h-full" type="vertical" />
                <Flex
                  vertical
                  gap={8}
                  align="center"
                  onClick={() =>
                    history.push(
                      `/care/fan/${useDetail?.userPoint?.userId}?nickName=${useDetail?.profile?.nickname}`
                    )
                  }>
                  <span className="text-[#262727] cursor-pointer text-[18px]">
                    {Utils.tranNumber(useDetail?.profile?.followeds, 2)}
                  </span>
                  <span className="text-[#535353] hover:text-[#262626] hover:cursor-pointer">
                    粉丝
                  </span>
                </Flex>
              </Flex>
              <Flex align="center" className="text-[14px] text-[#262626]">
                <span>个人介绍：</span>
                <span className="text-[#535353]">{useDetail?.profile?.signature || "--"}</span>
              </Flex>
            </Flex>
          </>
        )}
      </Flex>
      <Flex flex={1} vertical gap={12} className=" bg-[#ffffff] rounded-[20px] p-[16px]">
        <span>{isMySelf ? "我创建的歌单" : "歌单"}</span>
        <Spin spinning={playListLoading} tip="Loading">
          {renderList(useCreatorSongList)}
        </Spin>
      </Flex>

      <Flex flex={1} vertical gap={12} className=" bg-[#ffffff] rounded-[20px] p-[16px]">
        <span>{isMySelf ? "我收藏的歌单" : "收藏"}</span>
        <Spin spinning={playListLoading} tip="Loading">
          {renderList(useFavoriteSongList)}
        </Spin>
      </Flex>
    </Flex>
  )
}
