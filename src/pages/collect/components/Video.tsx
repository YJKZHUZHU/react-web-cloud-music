/** @format */

import {Flex} from "antd"
import {Artists, Image, Tag} from "@/components"
import VirtualList from "rc-virtual-list"
import {useEffect, useRef, useState} from "react"
import {mv, VideoInfo} from "@/api/collect"
import empty from "@/assets/empty.png"
import {history} from "@umijs/max"
import {Props} from "./index"
import Utils from "@/help"
import {VideoCameraOutlined} from "@ant-design/icons"

const Video = (props: Props) => {
  const {virtualListHeight, loading, getCount, setLoading} = props

  const [data, setData] = useState<VideoInfo[]>([])

  const pageRef = useRef({limit: 25, offset: 0})

  const hasMoreRef = useRef(false)

  const getData = async () => {
    try {
      setLoading(true)
      const res = await mv({...pageRef.current})
      setData([...data, ...res.data])
      hasMoreRef.current = res.hasMore
      getCount && getCount(res.count || res.data.length)
      setLoading(false)
    } catch (error) {
      console.log("error", error)
      setLoading(false)
    }
  }

  const onScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
    // Refer to: https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight#problems_and_solutions
    if (
      Math.abs(e.currentTarget.scrollHeight - e.currentTarget.scrollTop - virtualListHeight) <=
        140 &&
      !loading &&
      hasMoreRef.current
    ) {
      pageRef.current.offset += pageRef.current.limit
      getData()
    }
  }

  useEffect(() => {
    getData()
  }, [])

  if (data.length === 0 && !loading)
    return (
      <Flex vertical gap={8} align="center" justify="center" style={{height: virtualListHeight}}>
        <img src={empty} width={100} />
        <span className="w-[100px] text-center text-[#535454]">暂无收藏视频</span>
      </Flex>
    )

  const wrapList = Utils.chunkArray(data, 5)

  const renderName = (item: VideoInfo) => {
    if (item.type === 0) {
      return (
        <Artists
          color="#B0B2B2"
          hoverColor="#7B7B7B"
          data={item.creator.map((item) => {
            return {
              id: item.userId,
              name: item.userName
            }
          })}
        />
      )
    }
    return (
      <Flex gap={4} className=" cursor-pointer text-[#B0B2B2] hover:text-[#7B7B7B]">
        <span>by</span>
        <Artists color="#B0B2B2" hoverColor="#7B7B7B" type="user" data={item.creator} />
      </Flex>
    )
  }

  const onLink = (item: VideoInfo) => {
    if (item.type === 0) {
      return history.push(`mv-detail/${item.vid}`)
    }

    return history.push(`video-detail/${item.vid}`)
  }

  return (
    <VirtualList
      fullHeight
      itemHeight={146}
      height={virtualListHeight}
      data={wrapList!}
      styles={{verticalScrollBarThumb: {display: "none"}}}
      onScroll={onScroll}
      itemKey="key">
      {(item: {key: number; list: VideoInfo[]}) => {
        return (
          <Flex gap={12} key={item.key} wrap className=" pb-[12px]">
            {item.list.map((item) => {
              return (
                <Flex onClick={() => onLink(item)} className="w-[200px] cursor-pointer" vertical key={item.vid}>
                  <div className="relative h-[100px]">
                    <Image
                      className="w-[200px] h-[100px] object-cover"
                      width={200}
                      height={100}
                      src={item.coverUrl}
                      size={[200, 100]}
                      multiple={2}
                    />
                    <Flex
                      align="center"
                      gap={4}
                      justify="end"
                      className="text-[12px] text-[#ffffff] absolute w-full top-0 px-[8px]">
                      <VideoCameraOutlined />
                      <span>{Utils.tranNumber(item.playTime, 2)}</span>
                    </Flex>
                    <Flex
                      justify="end"
                      className=" absolute text-[12px] text-[#ffffff] w-full bottom-0 px-[8px]">
                      {Utils.formatSeconds(item.durationms)}
                    </Flex>
                  </div>
                  <Flex align="center" className=" mt-[2px]" gap={4}>
                    {item.type === 0 ? <Tag>MV</Tag> : null}
                    <span className="text-[14px] cursor-pointer flex-1 line-clamp-1 text-[#272728] hover:text-[#000000]">
                      {item.title}
                    </span>
                  </Flex>
                  {renderName(item)}
                </Flex>
              )
            })}
          </Flex>
        )
      }}
    </VirtualList>
  )
}
export default Video
