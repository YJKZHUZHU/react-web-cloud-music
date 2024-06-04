/** @format */

import React, {useEffect, useRef, useState} from "react"
import {Spin, message, Flex} from "antd"
import {history} from "@umijs/max"
import VirtualList from "rc-virtual-list"
import {Image, PlayVideoIcon} from "@/components"
import {IIPersonalizedPrivatecontentListItem, personalizedPrivatecontentList} from "@/api/video"
import Utils from "@/help"
import {useVirtualListHeight} from "@/hooks"

export default function () {
  const [list, setList] = useState<IIPersonalizedPrivatecontentListItem[]>([])
  const [loading, setLoading] = useState(false)
  const pageRef = useRef({limit: 60, offset: 0})
  const hasMoreRef = useRef(false)
  const virtualListHeight = useVirtualListHeight(20)

  const getList = async () => {
    try {
      setLoading(true)
      const res = await personalizedPrivatecontentList(pageRef.current)
      hasMoreRef.current = res.data.more
      setList([...list, ...res.data.result])
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log("error", error)
    }
  }

  const onScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
    // Refer to: https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight#problems_and_solutions
    if (
      Math.abs(e.currentTarget.scrollHeight - e.currentTarget.scrollTop - virtualListHeight!) <=
        160 &&
      !loading &&
      hasMoreRef.current
    ) {
      pageRef.current.offset += pageRef.current.limit
      getList()
    }
  }

  const onLink = (item: IIPersonalizedPrivatecontentListItem) => {
    if (+item.type === 5) {
      return history.push(`/mv-detail/${item.id}`)
    }
    if (+item.type === 24) {
      return history.push(`/video-detail/${item.videoId}`)
    }
    return message.info("该视频暂时无法播放哦")
  }
  useEffect(() => {
    getList()
  }, [])

  const wrapList = Utils.chunkArray(list, 5)

  return (
    <Flex vertical flex={1} className=" bg-[#ffffff] rounded-[20px] p-[16px]">
      <Spin spinning={loading} tip="Loading..." delay={500}>
        <VirtualList
          className="flex-1"
          onScroll={onScroll}
          itemKey="key"
          itemHeight={130}
          data={wrapList}
          styles={{verticalScrollBarThumb: {display: "none"}}}
          height={virtualListHeight}>
          {(source: {key: number; list: IIPersonalizedPrivatecontentListItem[]}) => {
            return (
              <Flex gap={27} key={source.key} wrap className=" pb-[16px] ">
                {source.list.map((item) => {
                  return (
                    <Flex
                      key={item.id}
                      onClick={() => onLink(item)}
                      vertical
                      gap={8}
                      className="cursor-pointer">
                      <div className=" relative w-[200px] h-[100px]">
                        <Image
                          src={item.sPicUrl}
                          size={[200, 100]}
                          width={200}
                          height={100}
                          className="w-[200px] h-[100px]"
                        />
                        <PlayVideoIcon />
                      </div>
                      <span className=" w-[200px] line-clamp-1 text-[#282828] hover:text-[#010302]">
                        {item.name}
                      </span>
                    </Flex>
                  )
                })}
              </Flex>
            )
          }}
        </VirtualList>
      </Spin>
    </Flex>
  )
}
