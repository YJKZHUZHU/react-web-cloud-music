/** @format */

import {
  FolderAddOutlined,
  PlayCircleOutlined,
  PlusOutlined,
  ShareAltOutlined,
  CheckOutlined,
  EditOutlined,
  CaretDownOutlined,
  CaretUpOutlined
} from "@ant-design/icons"
import {Button, Tabs, Flex, Tag, Divider, Tooltip, Modal, Checkbox} from "antd"
import {history, useParams} from "@umijs/max"
import {Comment, Image} from "@/components"
import dayjs from "dayjs"
import Utils from "@/help"
import classNames from "classnames"
import {
  useGetDetail,
  useGetLikelist,
  useLikelist,
  useLoading,
  usePlayListDetailData
} from "@/store/playlistDetail"
import {ListTable, Collection} from "./components"
import {
  useGetSongInfo,
  usePlayRecord,
  useSetPlayRecord,
  useSetPlayRecordTip,
  useSetPlayHistory,
  usePlayHistory,
  ISongsItem,
  useIsRemind,
  useSetIsRemind
} from "@/store/player"
import {MouseEventHandler, useEffect, useMemo, useState} from "react"
import {CommentTypeEnum} from "@/types/comment"
import {useVirtualListHeight} from "@/hooks"

const PlayList = () => {
  const [showAll, setShowAll] = useState(false)
  const {id} = useParams() as unknown as {id: string}
  const getSongInfo = useGetSongInfo()
  const playHistory = usePlayHistory()
  const getLikelist = useGetLikelist()

  const setPlayHistory = useSetPlayHistory()
  const playListDetail = usePlayListDetailData(Number(id))!
  const getDetail = useGetDetail()
  const playRecord = usePlayRecord()
  const setPlayRecord = useSetPlayRecord()
  const setPlayRecordTip = useSetPlayRecordTip()
  const isRemind = useIsRemind()
  const setIsRemind = useSetIsRemind()

  const [open, setIsOpen] = useState(false)

  const loading = useLoading()

  useEffect(() => {
    getLikelist()
    getDetail(Number(id))
  }, [id])

  const onRemind = () => {}

  const onPlay = () => {
    if (playListDetail?.playlist) {
      getSongInfo(playListDetail?.playlist?.tracks[0]?.id)

      setPlayHistory(playListDetail?.playlist?.tracks as ISongsItem[])
      setPlayRecordTip("已开始播放")
      setIsOpen(false)
    }
  }

  const label = useMemo<string[]>(() => {
    return playListDetail?.playlist?.creator?.expertTags || playListDetail?.playlist?.tags || []
  }, [playListDetail])

  const commentTabContent = useMemo(() => {
    return playListDetail?.playlist?.commentCount
      ? `评论(${Utils.formatCommentNumber(playListDetail?.playlist?.commentCount)})`
      : "评论"
  }, [playListDetail])

  const onPlayAll = () => {
    if (!isRemind) {
      setIsOpen(true)
      return
    }
    onPlay()
  }

  const onAdd: MouseEventHandler<HTMLSpanElement> = (e) => {
    e.stopPropagation()
    let result = playHistory

    playListDetail?.playlist?.tracks.forEach((item) => {
      if (result.find((d) => d.id === item.id) === undefined) {
        result.push(item as ISongsItem)
      }
    })
    setPlayHistory(result)
    setPlayRecordTip("已添加到播放列表")
  }

  const items = [
    {
      label: "歌曲列表",
      key: "1",
      children: <ListTable data={playListDetail?.playlist.tracks! || []} loading={loading} />
    },
    {
      label: commentTabContent,
      key: "2",
      children: (
        <div className=" min-h-[200px]">
          <Comment id={Number(id)} type={CommentTypeEnum.playList} />
        </div>
      )
    },
    {
      label: "收藏者",
      key: "3",
      children: (
        <div className=" min-h-[200px]">
          <Collection id={Number(id)} />
        </div>
      )
    }
  ]

  return (
    <Flex
      flex={1}
      vertical
      gap={24}
      // style={{minHeight: virtualListHeight}}
      className={classNames("bg-[#ffffff] rounded-[20px] p-[16px] ")}>
      <Flex gap={16}>
        <Image
          size={[212, 212]}
          multiple={2}
          src={playListDetail?.playlist.creator.backgroundUrl}
          width={212}
          height={212}
          className="w-[212px] h-[212px]"
        />

        <Flex flex={1} vertical gap={12}>
          <Flex gap={4} align="center">
            <Tag color="red" bordered={false}>
              歌单
            </Tag>
            <span className="text-[18px] font-[600] text-[#262627]">
              {playListDetail?.playlist?.name}
            </span>
            {!playListDetail?.playlist?.subscribed && (
              <EditOutlined
                style={{color: "#262627", fontSize: 18}}
                onClick={() => history.push(`/edit-song-list?id=${playListDetail?.playlist?.id}`)}
              />
            )}
          </Flex>
          <Flex gap={4} align="center">
            <Image
              size={[40, 40]}
              multiple={2}
              src={playListDetail?.playlist?.creator.avatarUrl}
              width={40}
              height={40}
              className="w-[40px] h-[40px] rounded-[50%]"
            />

            <span
              className="cursor-pointer text-[#40699F]"
              onClick={() => history.push(`/homepage/${playListDetail?.playlist?.userId}`)}>
              {playListDetail?.playlist?.creator.nickname}
            </span>
            <span>{dayjs(playListDetail?.playlist?.createTime).format("YYYY-MM-DD")}创建</span>
          </Flex>
          <Flex gap={4} align="center">
            <Button icon={<PlayCircleOutlined />} onClick={onPlayAll} type="primary">
              <div className=" inline-flex gap-[4px] items-center">
                <span> 播放全部</span>
                <Divider type="vertical" />
                <Tooltip title="添加全部到播放列表">
                  <PlusOutlined onClick={onAdd} />
                </Tooltip>
              </div>
            </Button>
            <Button
              icon={
                playListDetail?.playlist?.subscribed ? <CheckOutlined /> : <FolderAddOutlined />
              }
              type="primary">
              {playListDetail?.playlist?.subscribed ? "已收藏" : "收藏"}(
              {Utils.tranNumber(playListDetail?.playlist?.subscribedCount, 0)})
            </Button>
            <Button icon={<ShareAltOutlined />} type="primary">
              分享({Utils.tranNumber(playListDetail?.playlist?.shareCount, 0)})
            </Button>
          </Flex>
          {label.length !== 0 && (
            <Flex gap={4} align="center">
              <span className="text-[#363D62]">标签：</span>
              <Flex gap={4} align="center">
                {label.map((item) => {
                  return (
                    <Tag
                      className=" cursor-pointer"
                      color="green"
                      bordered={false}
                      onClick={() => history.push(`/find-music/song-list?tag=${item}`)}
                      key={item}>
                      {item}
                    </Tag>
                  )
                })}
              </Flex>
            </Flex>
          )}

          <Flex gap={8} align="center">
            <Flex align="center">
              <span className="text-[#363D62]">歌曲数：</span>
              <span className="text-[#BABABD]">{playListDetail?.playlist?.trackCount || 0}</span>
            </Flex>
            <Flex align="center">
              <span className="text-[#363D62]">播放数：</span>
              <span className="text-[#BABABD]">
                {Utils.tranNumber(+playListDetail?.playlist?.playCount!, 0) || 0}
              </span>
            </Flex>
          </Flex>

          <Flex align="center" gap={12}>
            <Flex align="center">
              <span className="text-[#363D62]">简&emsp;介：</span>
              {playListDetail?.playlist?.description && (
                <Flex flex={1} align="center" gap={4}>
                  <span
                    className={classNames("text-[#535353], leading-[20px]", {
                      "line-clamp-1": !showAll
                    })}>
                    {playListDetail?.playlist?.description}
                  </span>
                  {showAll ? (
                    <CaretUpOutlined className="cursor-pointer" onClick={() => setShowAll(false)} />
                  ) : (
                    <CaretDownOutlined
                      className="cursor-pointer"
                      onClick={() => setShowAll(true)}
                    />
                  )}
                </Flex>
              )}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Tabs defaultActiveKey="1" tabBarStyle={{margin: 0}} items={items} />
      <Modal
        width={400}
        classNames={{header: "text-center text-[#272828] font-[600] ", body: "flex justify-center"}}
        className=" "
        title="替换播放列表"
        open={open}
        onCancel={() => {
          setIsRemind(false)
          setIsOpen(false)
          console.log("点击了取消")
        }}
        footer={
          <Flex justify="center">
            <Button type="primary" onClick={onPlay}>
              继续
            </Button>
          </Flex>
        }>
        <Flex vertical gap={12}>
          <span>“播放全部”，将会替换当前播放列表，是否继续</span>
          <Checkbox checked={isRemind} onChange={(e) => setIsRemind(e.target.checked)}>
            不在提醒
          </Checkbox>
        </Flex>
      </Modal>
    </Flex>
  )
}

export default PlayList
