/** @format */

import React, {useEffect, useMemo, useRef, useState} from "react"
import {Popover, Tag, Button, Divider, Flex, Empty, Spin} from "antd"
import empty from "@/assets/empty.png"
import {CaretRightOutlined, RightOutlined} from "@ant-design/icons"
import VirtualList from "rc-virtual-list"
import {history} from "@umijs/max"
import {Artists, Image, PlayVideoIcon} from "@/components"
import {useVirtualListHeight} from "@/hooks"
import {
  useInit,
  useTagList,
  useCategoryList,
  IVideoGroupListItem,
  IVideoListItem
} from "@/store/video"
import {videoTimelineAll, videoGroup} from "@/api/video"
import Utils from "@/help"

const {CheckableTag} = Tag

interface IActiveTag {
  id: number
  name: string
}

const Video = () => {
  const [visible, setVisible] = useState(false)
  const init = useInit()

  const virtualListHeight = useVirtualListHeight(80)

  const tagList = useTagList()

  const categoryList = useCategoryList()

  const [activeTag, setactiveTag] = useState<IActiveTag>()

  const [list, setList] = useState<IVideoListItem[]>([])

  const [loading, setLoading] = useState(false)

  const hasMoreRef = useRef(false)
  const pageRef = useRef({offset: 0})

  useEffect(() => {
    init()
    getData()
  }, [])

  const getData = async (activeTag?: IActiveTag, init: boolean = false) => {
    try {
      setLoading(true)
      const res = await (activeTag
        ? videoGroup({id: activeTag?.id, ...pageRef.current})
        : videoTimelineAll(pageRef.current))

      setList(init ? res.data?.datas : [...list, ...res.data?.datas])
      hasMoreRef.current = res.data?.hasmore
      // pageRef.current.offset += res.data?.datas.length
      pageRef.current.offset += 8 // 固定写死，接口有问题
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log("error", error)
    }
  }

  const onCheckableTag = async (item?: IVideoGroupListItem) => {
    if (item?.id === activeTag?.id) return
    pageRef.current.offset = 0
    hasMoreRef.current = false
    setVisible(false)
    if (!item) {
      setactiveTag(undefined)

      return getData(undefined, true)
    }
    setactiveTag({
      id: item.id,
      name: item.name
    })
    getData(
      {
        id: item.id,
        name: item.name
      },
      true
    )
  }

  const onScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
    // Refer to: https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight#problems_and_solutions
    if (
      Math.abs(e.currentTarget.scrollHeight - e.currentTarget.scrollTop - virtualListHeight!) <=
        100 &&
      !loading &&
      hasMoreRef.current
    ) {
      // pageRef.current.offset += pageRef.current.limit
      getData(activeTag)
    }
  }

  const content = useMemo(() => {
    return (
      <Flex wrap gap={12}>
        {tagList.map((item) => {
          return (
            <div key={item.id} className="w-[80px]">
              <CheckableTag
                className=" max-w-[80px] cursor-pointer !overflow-hidden   !break-words !text-ellipsis !whitespace-nowrap"
                checked={activeTag?.id === item.id}
                onChange={() => onCheckableTag(item)}>
                {item.name}
              </CheckableTag>
            </div>
          )
        })}
      </Flex>
    )
  }, [activeTag?.id, tagList])

  const wrapList = Utils.chunkArray(list, 3)

  return (
    <Flex flex={1} vertical gap={20} className=" bg-[#ffffff] rounded-[20px] p-[16px]">
      <Flex gap={12} justify="space-between">
        <Popover
          getPopupContainer={(node) => node}
          open={visible}
          onOpenChange={setVisible}
          overlayClassName="w-[700px]"
          overlayInnerStyle={{width: 700, height: 300, overflowY: "scroll"}}
          content={content}
          title={
            <CheckableTag checked={activeTag === undefined} onChange={() => onCheckableTag()}>
              全部视频
            </CheckableTag>
          }
          placement="right"
          trigger="click">
          <Button
            id="_videoPopoverContainer"
            className="w-[120px] "
            iconPosition="end"
            icon={<RightOutlined />}
            shape="round">
            {activeTag?.name || "全部视频"}
          </Button>
        </Popover>
        <Flex flex={1} justify="end">
          {categoryList.map((item, index) => {
            return (
              <Flex align="center" key={item.id}>
                <CheckableTag
                  key={item.name}
                  checked={activeTag?.id === item.id}
                  onChange={() => onCheckableTag(item)}>
                  {item.name}
                </CheckableTag>
                {index !== categoryList.length - 1 ? <Divider type="vertical" /> : null}
              </Flex>
            )
          })}
        </Flex>
      </Flex>

      {list.length === 0 && !loading ? (
        <Empty
          imageStyle={{display: "flex", justifyContent: "center", paddingRight: 27}}
          style={{height: virtualListHeight}}
          image={empty}
          description="暂无视频"></Empty>
      ) : (
        <Spin spinning={loading} tip="Loading...">
          <VirtualList
            onScroll={onScroll}
            itemKey="key"
            itemHeight={250}
            data={wrapList}
            styles={{verticalScrollBarThumb: {display: "none"}}}
            height={virtualListHeight}>
            {(source: {key: number; list: IVideoListItem[]}) => {
              return (
                <Flex gap={22} key={source.key} wrap className=" pb-[16px] ">
                  {source.list.map((item) => {
                    return (
                      <Flex
                        key={item?.data?.vid}
                        onClick={() => history.push(`/video-detail/${item?.data?.vid}`)}
                        vertical
                        gap={8}
                        className="cursor-pointer w-[350px]">
                        <div className=" relative w-[350px] h-[200px]">
                          <Image
                            src={item.data?.coverUrl}
                            size={[350, 200]}
                            width={350}
                            height={200}
                            className="w-[350px] h-[200px]"
                          />
                          <PlayVideoIcon />
                          <span className=" block text-right text-[#ffffff] bottom-[8px] text-[12px] absolute w-full px-[8px]">
                            {Utils.formatSeconds(item.data?.durationms)}
                          </span>

                          <Flex
                            gap={2}
                            align="center"
                            justify="end"
                            className="text-[#ffffff] top-[8px] text-[12px] absolute w-full px-[8px]">
                            <CaretRightOutlined />
                            <span> {Utils.tranNumber(item?.data?.playTime, 0)}</span>
                          </Flex>
                        </div>
                        <span className=" flex-1 text-[14px] line-clamp-1 text-[#272728] hover:text-[#010302]">
                          {item?.data?.title}
                        </span>
                        <Flex align="center" gap={4} className="text-[#B2B1B3] text-[12px]">
                          <span>by</span>
                          <Artists
                            max={2}
                            data={[
                              {
                                userName: item?.data?.creator?.nickname,
                                userId: item?.data?.creator?.userId
                              }
                            ]}
                            type="user"
                          />
                        </Flex>
                      </Flex>
                    )
                  })}
                </Flex>
              )
            }}
          </VirtualList>
        </Spin>
      )}
    </Flex>
  )
}

export default Video
