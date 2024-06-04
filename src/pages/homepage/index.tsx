/** @format */

import React, {useEffect, useState} from "react"
import {useRequest} from "ahooks"
import {useQuery} from "@/hooks"
import {useParams, history} from "@umijs/max"
import API from "@/api"
import {userDetail, vipGrowthpoint} from "@/api/user"
import {Space, Avatar, Flex, Divider} from "antd"
import {CustomerServiceOutlined, ManOutlined, WomanOutlined} from "@ant-design/icons"
import {IUserInfo, IVipInfo, useUserInfo, useVipInfo} from "@/store/user"
import {EnumLocalStorage, getItem} from "@/help/cache"
import {Image} from "@/components"
import man from "@/assets/man.png"
import woman from "@/assets/woman.png"
import Utils from "@/help"

export default function () {
  const {uid} = useParams() as {uid: string}
  console.log("uid--", uid)
  const [useDetail, setUserDetail] = useState<Partial<IUserInfo>>()
  const [loading, setLoading] = useState(false)
  const [vipInfo, setVipInfo] = useState<Partial<IVipInfo>>()
  const userInfo = useUserInfo()
  const vipDetail = useVipInfo()

  const init = async () => {
    try {
      if (uid === getItem(EnumLocalStorage.userId)) {
        setUserDetail(userInfo)
        setVipInfo(vipDetail)
        return
      }
      setLoading(true)
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

  const vipLevel = vipInfo?.userLevel?.level

  useEffect(() => {
    uid && init()
  }, [uid])

  console.log("useDetail", useDetail, vipInfo)

  return (
    <Flex vertical gap={12} flex={1}>
      <Flex gap={24} className=" bg-[#ffffff] rounded-[20px] p-[16px]" flex={1}>
        <Image
          src={useDetail?.profile?.avatarUrl}
          width={150}
          height={150}
          size={[150, 150]}
          className="w-[150px] h-[150px] rounded-[50%]"
        />

        <Flex flex={1} vertical gap={12}>
          <span>{useDetail?.profile?.nickname}</span>
          <Flex align="center" gap={6}>
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
              <span className="text-[#535353] hover:text-[#262626] hover:cursor-pointer">动态</span>
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
              <span className="text-[#535353] hover:text-[#262626] hover:cursor-pointer">关注</span>
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
              <span className="text-[#535353] hover:text-[#262626] hover:cursor-pointer">粉丝</span>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}
