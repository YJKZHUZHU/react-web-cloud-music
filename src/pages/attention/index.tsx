/** @format */

import React, {useEffect, useRef, useState} from "react"
import {Divider, Empty, Flex, Skeleton} from "antd"
import {CaretRightOutlined, LikeOutlined, DeleteOutlined} from "@ant-design/icons"
import {Artists, HighlightMentions, Image, PlayVideoIcon, Tag} from "@/components"
import {history} from "@umijs/max"
import empty from "@/assets/empty.png"
import VirtualList from "rc-virtual-list"
import {EnumEventType, IEventItem} from "@/api/care"
import {useVirtualListHeight} from "@/hooks"
import Utils from "@/help"
import classNames from "classnames"
import {HotItem, hotTopic, event} from "@/api/attention"

const MapText = new Map()
  .set(EnumEventType.shareBoke, "分享播客")
  .set(EnumEventType.publishMlog, "发布Mlog")
  .set(EnumEventType.shareMV, "分享MV")
  .set(EnumEventType.sharePlaylist, "分享歌单")
  .set(EnumEventType.transmit, "转发")
  .set(EnumEventType.shareAlbum, "分享专辑")
  .set(EnumEventType.shareSingle, "分享单曲")
  .set(EnumEventType.publishDynamic, "发布动态")

export default function () {
  const hasMoreRef = useRef(false)
  const virtualListHeight = useVirtualListHeight(20)

  const pageRef = useRef({pagesize: 30, lasttime: -1})

  const hotPageRef = useRef({limit: 10, offset: 0})

  const [data, setData] = useState<IEventItem[]>([])

  const [loading, setLoading] = useState(false)

  const [hotList, setHotList] = useState<HotItem[]>([])
  const [hotLoading, setHotLoading] = useState(false)

  const getData = async () => {
    try {
      setLoading(true)
      const res = await event(pageRef.current)
      pageRef.current.lasttime = res.data.lasttime
      hasMoreRef.current = res.data.more
      setData(data.concat(res.data.event))
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log("error", error)
    }
  }

  const getHot = async () => {
    try {
      setHotLoading(true)
      const res = await hotTopic(hotPageRef.current)
      setHotList(res.data.hot)
      setHotLoading(false)
    } catch (error) {
      setHotLoading(false)
      console.log("error", error)
    }
  }

  const onScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
    // Refer to: https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight#problems_and_solutions
    if (
      Math.abs(e.currentTarget.scrollHeight - e.currentTarget.scrollTop - virtualListHeight!) <=
        30 &&
      !loading &&
      hasMoreRef.current
    ) {
      getData()
    }
  }

  useEffect(() => {
    getData()
    getHot()
  }, [])

  const renderMv = (item: IEventItem) => {
    const info = JSON.parse(item.json)
    const mv = info.mv
    return (
      <div
        onClick={() => history.push(`/mv-detail/${mv?.id}`)}
        className=" cursor-pointer relative w-[300px] mt-[12px]">
        <Image src={mv?.imgurl16v9} width={300} className="w-[300px]" />
        <PlayVideoIcon />
        <Flex align="center" gap={4} className="px-[8px]  absolute top-[4px] w-full">
          <Tag className="text-[12px]" color="#ffffff" borderColor="#E1D9D3">
            MV
          </Tag>
          <span className="text-[#ffffff] text-[14px]">{mv?.name}</span>
          <span className="text-[#D7C9BD] text-[12px]">-</span>
          <span className="text-[#D7C9BD] text-[12px]">{mv?.artistName}</span>
        </Flex>
        <Flex
          align="center"
          gap={2}
          className="text-[#ffffff] text-[12px] px-[8px] absolute bottom-[8px] w-full">
          <CaretRightOutlined className="text-[12px]" />
          <span>{Utils.tranNumber(mv?.playCount, 2)}</span>
        </Flex>
        <div className=" text-[#ffffff] text-[12px] px-[8px] text-right absolute bottom-[8px]  w-full">
          {Utils.formatSeconds(mv?.duration)}
        </div>
      </div>
    )
  }

  const renderItem = (item: IEventItem) => {
    const info = JSON.parse(item.json)
    const djRadio = info?.djRadio
    const playList = info?.playlist
    const album = info?.album
    const song = info?.song

    const renderPicture = () => {
      if (item?.pics.length === 1) {
        return (
          <Image
            src={item.pics.at(0).pcSquareUrl}
            width={300}
            height={500}
            size={[300, 500]}
            multiple={2}
            className="w-[300px]"
          />
        )
      }

      if (item?.pics.length === 2) {
        return (
          <Flex gap={8} className="w-[500px]">
            {item?.pics?.map((item) => {
              return (
                <Image
                  key={item.pcSquareUrl}
                  src={item.pcSquareUrl}
                  width={240}
                  height={240}
                  size={[240, 240]}
                  multiple={2}
                  className="w-[240px] flex-1"
                />
              )
            })}
          </Flex>
        )
      }
      return (
        <Flex gap={8} className="w-[500px]" wrap>
          {item?.pics?.map((item) => {
            return (
              <Image
                key={item.pcSquareUrl}
                src={item.pcSquareUrl}
                width={160}
                height={160}
                size={[160, 160]}
                multiple={2}
                className="w-[160px] flex-1"
              />
            )
          })}
        </Flex>
      )
    }

    return (
      <Flex vertical gap={8} className=" mt-[12px] mb-[12px] ">
        <Flex
          gap={12}
          className="py-[12px] px-[12px] bg-[#F2F2F2] hover:bg-[#E7E9E9] cursor-pointer">
          {djRadio && (
            <>
              <Image
                size={[50, 50]}
                src={djRadio?.picUrl}
                width={50}
                height={50}
                multiple={2}
                className="w-[50px] h-[50px]"
              />
              <Flex vertical gap={8}>
                <Flex gap={4} align="center">
                  <Tag className="text-[14px]">{djRadio?.category}</Tag>
                  <span className="text-[#262626] text-[14px]">{djRadio?.name}</span>
                </Flex>

                <span className="text-[#818182] text-[14px]">by {djRadio?.dj?.nickname}</span>
              </Flex>
            </>
          )}

          {playList && (
            <>
              <Image
                src={playList?.coverImgUrl}
                width={50}
                size={[50, 50]}
                height={50}
                multiple={2}
                className="w-[50px] h-[50px]"
              />
              <Flex vertical gap={8}>
                <Flex gap={4} align="center">
                  <Tag className="text-[14px]">歌单</Tag>
                  <span className="text-[#262626] text-[14px]">{playList?.name}</span>
                </Flex>

                <span className="text-[#818182] text-[14px]">by {playList?.creator?.nickname}</span>
              </Flex>
            </>
          )}
          {album && (
            <>
              <Image
                src={album?.picUrl}
                width={50}
                height={50}
                size={[50, 50]}
                multiple={2}
                className="w-[50px] h-[50px]"
              />
              <Flex vertical gap={8}>
                <span className="text-[#262626] text-[14px]">{album?.name}</span>
                <Artists className="text-[14px]" data={album?.artists} />
                {/* <span className="text-[#818182] text-[14px]">by {playList?.creator?.nickname}</span> */}
              </Flex>
            </>
          )}
          {song && (
            <>
              <Image
                src={song?.img80x80}
                width={50}
                height={50}
                size={[50, 50]}
                multiple={2}
                className="w-[50px] h-[50px]"
              />
              <Flex vertical gap={8}>
                <span className="text-[#262626] text-[14px]">{song?.name}</span>
                <Artists className="text-[14px]" data={song?.artists} />
                {/* <span className="text-[#818182] text-[14px]">by {playList?.creator?.nickname}</span> */}
              </Flex>
            </>
          )}
        </Flex>

        {renderPicture()}
      </Flex>
    )
  }

  return (
    <Flex flex={1} className=" bg-[#ffffff] rounded-[20px] p-[16px] pr-0 min-h-[400px]">
      {loading && <Skeleton active paragraph={{rows: 15}} />}
      {/* <Spin spinning={loading} tip="Loading..." /> */}
      {data.length === 0 && !loading ? (
        <Empty
          imageStyle={{display: "flex", justifyContent: "center", flex: 1, paddingRight: 27}}
          style={{height: virtualListHeight}}
          image={empty}
          className=" justify-center flex flex-col"
          description="暂无动态"
        />
      ) : (
        <VirtualList
          className="flex-1"
          fullHeight
          onScroll={onScroll}
          itemKey="id"
          itemHeight={120}
          data={data}
          styles={{verticalScrollBarThumb: {display: "none"}}}
          height={virtualListHeight}>
          {(item: IEventItem, index) => {
            const info = JSON.parse(item?.json)
            return (
              <Flex
                vertical
                key={item.id}
                gap={16}
                className={classNames("px-[12px] pb-[16px] pt-[16px]")}>
                <Flex gap={16}>
                  <Image
                    src={item?.user?.avatarUrl}
                    width={50}
                    height={50}
                    size={[50, 50]}
                    multiple={2}
                    className="w-[50px] rounded-[50%]"
                  />
                  <Flex vertical flex={1}>
                    <Flex vertical gap={8} className="h-[50px]">
                      <Flex align="center" gap={8} className="">
                        <span className="text-[#406A9F] cursor-pointer hover:text-[#0E43A1]">
                          {item?.user?.nickname}
                        </span>
                        {item?.user?.vipRights?.associator?.iconUrl && (
                          <img
                            alt=""
                            src={item?.user?.vipRights?.associator?.iconUrl}
                            height={16}
                            className="h-[16px]"
                          />
                        )}

                        <span className="text-[#262626]">
                          {MapText.get(item?.type)}
                          {/* {item.type} */}
                        </span>
                      </Flex>
                      <span className="text-[#868787] text-[14px]">
                        {Utils.commentFormatTime(item.eventTime)}
                      </span>
                    </Flex>
                    <Flex vertical gap={8}>
                      <HighlightMentions text={info?.msg} />

                      <Flex align="center" gap={4}>
                        {item.bottomActivityInfos &&
                          item.bottomActivityInfos?.map((item) => {
                            return (
                              <span
                                className="text-[14px] text-[#406A9F] cursor-pointer hover:text-[#0E43A1]"
                                key={item.id}>
                                #{item.name}#
                              </span>
                            )
                          })}
                      </Flex>
                    </Flex>
                    {[
                      EnumEventType.shareBoke,
                      EnumEventType.sharePlaylist,
                      EnumEventType.shareAlbum,
                      EnumEventType.shareSingle,
                      EnumEventType.publishDynamic
                    ].includes(item.type) && renderItem(item)}
                    {EnumEventType.shareMV === item.type && renderMv(item)}
                  </Flex>
                </Flex>

                <Flex justify="end" gap={16}>
                  {item.info.liked ? (
                    <Flex gap={4}>
                      <LikeOutlined />
                      <span>{`(${item.info.likedCount})`}</span>
                    </Flex>
                  ) : (
                    <LikeOutlined />
                  )}

                  <DeleteOutlined />
                </Flex>
                {index !== data.length - 1 && <Divider className=" !mb-0 !mt-0" />}
              </Flex>
            )
          }}
        </VirtualList>
      )}
      <Divider type="vertical" className="!h-full !mr-0" />
      {hotList.length === 0 && !hotLoading ? (
        <Empty
          imageStyle={{display: "flex", justifyContent: "center", paddingRight: 27}}
          style={{height: virtualListHeight}}
          image={empty}
          className=" justify-center flex flex-col"
          description="暂无话题"
        />
      ) : (
        <Flex vertical gap={12} className="w-[200px] h-full">
          <span
            onClick={() => history.push("/")}
            className="text-[#262727] hover:text-[#000001] cursor-pointer pl-[18px]">
            热门话题
          </span>
          {hotLoading && (
            <Flex gap={8}>
              <Skeleton.Avatar active />
              <Skeleton active paragraph={{rows: 1, width: "80%"}} />
            </Flex>
          )}
          {hotList.map((item) => {
            return (
              <Flex
                gap={8}
                key={item.iconUrl}
                className=" pl-[18px] pr-[12px] py-[4px] cursor-pointer hover:bg-[#F1F2F2]">
                <Image
                  src={item.sharePicUrl}
                  size={[50, 50]}
                  width={50}
                  height={50}
                  className="w-[50px] h-[50px]"
                />
                <Flex vertical gap={8}>
                  <span className="text-[#262626] text-[14px]">#{item.title}#</span>
                  <span className="text-[#B2B3B3] text-[14px]">
                    {item.participateCount || 0}参与
                  </span>
                </Flex>
              </Flex>
            )
          })}
        </Flex>
      )}
    </Flex>
  )
}
