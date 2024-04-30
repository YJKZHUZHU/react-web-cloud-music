/** @format */

import {
  FolderAddOutlined,
  PlayCircleOutlined,
  PlusOutlined,
  ShareAltOutlined,
  CheckOutlined,
  EditOutlined,
  CustomerServiceOutlined,
  CaretDownOutlined,
  CaretUpOutlined
} from "@ant-design/icons"
import {Button, Tabs, Avatar, Flex, Tag} from "antd"
import {history, useParams} from "@umijs/max"
import {Comment} from "@/components"
import dayjs from "dayjs"
import {ListTable, Collection} from "./components"
import Utils from "@/help"
import classNames from "classnames"
import {useGetDetail, useLoading, usePlayListDetailData} from "@/store/playlistDetail"
import {useGetSongInfo, usePlayRecord, useSetPlayRecord, useSetPlayRecordTip} from "@/store/player"
import {useEffect, useMemo, useState} from "react"
import {CommentTypeEnum} from "@/types/comment"
import styles from "./index.scss"

const PlayList = () => {
  const [showAll, setShowAll] = useState(false)
  const params: any = useParams()
  const {id} = params
  const getSongInfo = useGetSongInfo()
  const playListDetail = usePlayListDetailData(id)
  const getDetail = useGetDetail()
  const playRecord = usePlayRecord()
  const setPlayRecord = useSetPlayRecord()
  const setPlayRecordTip = useSetPlayRecordTip()

  useEffect(() => {
    getDetail(id)
  }, [id])

  const loading = useLoading()

  const label = useMemo<string[]>(() => {
    return playListDetail?.playlist?.creator?.expertTags || playListDetail?.playlist?.tags || []
  }, [playListDetail])

  const commentTabContent = useMemo(() => {
    return playListDetail?.playlist?.commentCount
      ? `评论(${Utils.formatCommentNumber(playListDetail?.playlist?.commentCount)})`
      : "评论"
  }, [playListDetail])

  const onPlayAll = () => {
    if (playListDetail?.playlist) {
      getSongInfo(playListDetail?.playlist?.tracks[0]?.id)
      setPlayRecordTip("歌单已更新")

      setPlayRecord(Utils.removeRepeat(playListDetail?.playlist?.tracks?.concat(playRecord), "id"))

      setTimeout(() => {
        setPlayRecordTip("")
      }, 1000)
    }
  }

  const items = [
    {
      label: "歌曲列表",
      key: "1",
      children: <ListTable data={playListDetail?.playlist.tracks!} loading={loading} />
    },
    {
      label: commentTabContent,
      key: "2",
      children: (
        <div className=" min-h-[200px]">
          <Comment id={id} type={CommentTypeEnum.playList} />
        </div>
      )
    },
    {
      label: "收藏者",
      key: "3",
      children: (
        <div className=" min-h-[200px]">
          <Collection />
        </div>
      )
    }
  ]

  return (
    <Flex
      vertical
      gap={24}
      className={classNames("bg-[#ffffff] rounded-[20px] p-[16px]", styles._playList)}>
      <Flex gap={16}>
        <Avatar
          icon={<CustomerServiceOutlined />}
          size={200}
          shape="square"
          alt="资源加载异常"
          src={`${playListDetail?.playlist.creator.backgroundUrl}?param=200y200`}
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
            <Avatar
              icon={<CustomerServiceOutlined />}
              size={30}
              shape="circle"
              alt="资源加载异常"
              src={`${playListDetail?.playlist?.creator.avatarUrl}?param=40y40`}
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
                <PlusOutlined />
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
            <Flex>
              <span className="text-[#363D62]">简&emsp;介：</span>
              <Flex flex={1} align="center">
                <span className={classNames("text-[#BABABD], leading-[20px]", {"line-clamp-1": !showAll})}>
                  {playListDetail?.playlist?.description}
                </span>
                {showAll ? (
                  <CaretUpOutlined
                    className="cursor-pointer self-start"
                    onClick={() => setShowAll(false)}
                  />
                ) : (
                  <CaretDownOutlined
                    className="cursor-pointer self-start"
                    onClick={() => setShowAll(true)}
                  />
                )}
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Tabs defaultActiveKey="1" className={styles.tabs} tabBarStyle={{margin: 0}} items={items} />
    </Flex>
  )
}

export default PlayList
