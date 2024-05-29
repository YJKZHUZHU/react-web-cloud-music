/** @format */

import React, {useEffect, useRef, useState} from "react"
import VirtualList from "rc-virtual-list"
import {FollowItem, userFollows} from "@/api/care"
import {EnumLocalStorage, getItem} from "@/help/cache"
import {useVirtualListHeight} from "@/hooks"
import {Empty, Flex, Spin} from "antd"
import {history} from "@umijs/max"
import {Image} from "@/components"
import empty from "@/assets/empty.png"
import {useNickName} from "@/store/login"
import classNames from "classnames"
import Utils from "@/help"

export default function () {
  const [list, setList] = useState<FollowItem[]>([])
  const [loading, setLoading] = useState(false)
  const pageRef = useRef({limit: 30, offset: 0})
  const hasMoreRef = useRef(false)
  const virtualListHeight = useVirtualListHeight(50)
  const nickName = useNickName()

  const getList = async () => {
    try {
      setLoading(true)
      const res = await userFollows({
        uid: getItem(EnumLocalStorage.userId) as string,
        ...pageRef.current
      })
      setList(res.data.follow)
      hasMoreRef.current = res.data.more
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log("error", error)
    }
  }
  useEffect(() => {
    getList()
  }, [])
  const onScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
    // Refer to: https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight#problems_and_solutions
    if (
      Math.abs(e.currentTarget.scrollHeight - e.currentTarget.scrollTop - virtualListHeight!) <=
        30 &&
      !loading &&
      hasMoreRef.current
    ) {
      pageRef.current.offset += pageRef.current.limit
      getList()
    }
  }

  if (list.length === 0 && !loading) {
    return (
      <Empty
        imageStyle={{display: "flex", justifyContent: "center", paddingRight: 27}}
        style={{height: virtualListHeight}}
        image={empty}
        description="暂无专辑"
      />
    )
  }
  return (
    <Flex
      style={{minHeight: virtualListHeight + 30}}
      flex={1}
      vertical
      gap={12}
      className=" bg-[#ffffff] rounded-[20px] p-[16px]">
      <span className="text-[18px] text-[#262627] font-bold">{nickName}的关注</span>
      <Spin spinning={loading} tip="Loading...">
        {list.length === 0 && !loading ? (
          <Empty
            imageStyle={{display: "flex", justifyContent: "center", paddingRight: 27}}
            style={{height: virtualListHeight}}
            image={empty}
            className=" justify-center flex flex-col"
            description="暂无关注"
          />
        ) : (
          <VirtualList
            onScroll={onScroll}
            itemKey="userId"
            itemHeight={80}
            data={list}
            styles={{verticalScrollBarThumb: {display: "none"}}}
            height={virtualListHeight}>
            {(item: FollowItem, index) => {
              return (
                <Flex
                  onClick={() => history.push(`/homepage/${item.userId}`)}
                  key={item.userId}
                  align="center"
                  className={classNames(
                    {"bg-[#F9F9F9]": index % 2 === 0},
                    "h-[120px] px-[12px]",
                    "hover:bg-[#EEEFF0] hover:cursor-pointer"
                  )}
                  gap={16}>
                  <div className=" relative">
                    <Image
                      className="cursor-pointer rounded-[50%] w-[80px] h-[80px]"
                      height={80}
                      width={80}
                      size={[80, 80]}
                      multiple={2}
                      src={item.avatarUrl}
                    />
                    {item.avatarDetail && (
                      <img
                        src={item.avatarDetail?.identityIconUrl}
                        width={16}
                        height={16}
                        className=" absolute bottom-[10px] right-0"
                      />
                    )}
                  </div>
                  <Flex align="center" gap={4} flex={1}>
                    <span className="font-bold text-[#282828] hover:text-[#010302]">
                      {item.nickname}
                    </span>
                    {item.vipRights?.associator && (
                      <img
                        className="h-[16px]"
                        alt=""
                        height={16}
                        src={item.vipRights?.associator?.iconUrl}
                      />
                    )}
                  </Flex>

                  <span className=" w-[150px] text-[#535353]">歌单：{item.playlistCount}</span>

                  <span className=" text-[#535353] w-[200px] text-right">
                    粉丝：{Utils.tranNumber(item.followeds, 0)}
                  </span>
                </Flex>
              )
            }}
          </VirtualList>
        )}
      </Spin>
    </Flex>
  )
}
