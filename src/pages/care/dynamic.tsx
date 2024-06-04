/** @format */

import React, {FC, useEffect, useRef, useState} from "react"
import {CaretRightOutlined, DeleteOutlined, LikeOutlined, UserOutlined} from "@ant-design/icons"
import {List, Avatar, Divider, message, Flex, Empty, Spin} from "antd"
import {useParams} from "@umijs/max"
import classnames from "classnames"
import Utils from "@/help/index"
import API from "@/api"
import styles from "@/pages/care/index.scss"
import {EnumLocalStorage, getItem} from "@/help/cache"
import {useNickName} from "@/store/login"
import {useQuery, useVirtualListHeight} from "@/hooks"
import VirtualList from "rc-virtual-list"
import {FollowItem, userFollows, userEvent, IEventItem, EnumEventType, eventDel} from "@/api/care"
import {history} from "@umijs/max"
import {Image, HighlightMentions, Tag, Artists, PlayVideoIcon} from "@/components"
import empty from "@/assets/empty.png"
import classNames from "classnames"

const MapText = new Map()
  .set(EnumEventType.shareBoke, "分享播客")
  .set(EnumEventType.publishMlog, "发布Mlog")
  .set(EnumEventType.shareMV, "分享MV")
  .set(EnumEventType.sharePlaylist, "分享歌单")
  .set(EnumEventType.transmit, "转发")
  .set(EnumEventType.shareAlbum, "分享专辑")
  .set(EnumEventType.shareSingle, "分享单曲")
  .set(EnumEventType.publishDynamic, "发布动态")

const Dynamic: FC = () => {
  const defaultNickName = useNickName()
  const {nickName = defaultNickName} = useQuery<{nickName: string}>()
  const {uid} = useParams()
  const [list, setList] = useState<IEventItem[]>([])
  const [loading, setLoading] = useState(false)
  const pageRef = useRef({limit: 30, lasttime: -1})
  const hasMoreRef = useRef(false)
  const virtualListHeight = useVirtualListHeight(50)

  const commentLike = async (info: any, t: number) => {
    const Ret: any = await API.commentLike({
      t,
      type: 6,
      threadId: info.threadId,
      cid: info.resourceId,
      timestamp: Date.now()
    })
    if (Ret.code !== 200) {
      return message.info("稍后再试哦。。")
    }
    message.success("好吧，现在点赞还有点问题，")
  }
  const onDel = async (evId: string) => {
    try {
      return message.info("全力开发中...")
      const res: any = await eventDel({evId})
      console.log("res--", res)
    } catch (error) {
      console.log("error", error)
    }
  }

  const getData = async () => {
    try {
      setLoading(true)
      const res = await userEvent({
        uid: Number(uid),
        ...pageRef.current
      })
      pageRef.current.lasttime = res.data.lasttime
      hasMoreRef.current = res.data.more
      setList([
        ...list,
        ...res.data.events?.filter((item) => item.type !== EnumEventType.publishMlog)
      ])
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
        30 &&
      !loading &&
      hasMoreRef.current
    ) {
      getData()
    }
  }

  useEffect(() => {
    uid && getData()
  }, [uid])

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
    <Flex
      style={{minHeight: virtualListHeight + 30}}
      flex={1}
      vertical
      gap={12}
      className=" bg-[#ffffff] rounded-[20px] p-[16px]">
      <span className="text-[18px] text-[#262627] font-bold">{nickName}的动态</span>
      <Spin spinning={loading} tip="Loading...">
        {list.length === 0 && !loading ? (
          <Empty
            imageStyle={{display: "flex", justifyContent: "center", paddingRight: 27}}
            style={{height: virtualListHeight}}
            image={empty}
            className=" justify-center flex flex-col"
            description="暂无动态"
          />
        ) : (
          <VirtualList
            fullHeight
            onScroll={onScroll}
            itemKey="id"
            itemHeight={120}
            data={list}
            styles={{verticalScrollBarThumb: {display: "none"}}}
            height={virtualListHeight}>
            {(item: IEventItem, index) => {
              const info = JSON.parse(item.json)
              return (
                <Flex
                  vertical
                  key={item.id}
                  gap={16}
                  className={classNames("px-[12px] pb-[16px] pt-[16px]")}>
                  <Flex gap={16}>
                    <Image
                      src={item.user?.avatarUrl}
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
                            {nickName || item?.user?.nickname}
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
                            {MapText.get(item.type)}
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
                      <Flex gap={4} onClick={() => commentLike(item.info, 0)}>
                        <LikeOutlined className={styles.active} />
                        <span>{`(${item.info.likedCount})`}</span>
                      </Flex>
                    ) : (
                      <LikeOutlined
                        className={styles.active}
                        onClick={() => commentLike(item.info, 1)}
                      />
                    )}

                    <DeleteOutlined onClick={() => onDel(item.actId.toString())} />
                  </Flex>
                  {index !== list.length - 1 && <Divider className=" !mb-0 !mt-0" />}
                </Flex>
              )
            }}
          </VirtualList>
        )}
      </Spin>
    </Flex>
  )
}

export default Dynamic
