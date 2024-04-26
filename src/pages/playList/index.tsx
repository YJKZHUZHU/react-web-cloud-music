/** @format */

import {
  FolderAddOutlined,
  PlayCircleOutlined,
  PlusOutlined,
  ShareAltOutlined,
  CheckOutlined,
  EditOutlined,
  CustomerServiceOutlined
} from "@ant-design/icons"
import {Button, Tabs, Space, Avatar} from "antd"
import {history, useParams} from "@umijs/max"
import dayjs from "dayjs"
import {HotComment, NewComment} from "@/components"
import {ListTable, Collection} from "./components"
import Utils from "@/help"
import classNames from "classnames"
import styles from "./index.scss"
import {useGetDetail, useLoading, usePlayListDetailData} from "@/store/playlistDetail"
import {useGetSongInfo, usePlayRecord, useSetPlayRecord, useSetPlayRecordTip} from "@/store/player"
import {useEffect, useState} from "react"
import {IPlaylistDetails} from "@/types/playlistDetails"

const PlayList = () => {
  const params: any = useParams()
  const [playListDetail, setPlayListDetail] = useState<IPlaylistDetails>()
  const {id} = params
  const getSongInfo = useGetSongInfo()
  const getDetail = useGetDetail()
  const playRecord = usePlayRecord()
  const setPlayRecord = useSetPlayRecord()
  const setPlayRecordTip = useSetPlayRecordTip()

  const init = async (id: number) => {
    try {
      const res = await getDetail(id)
      setPlayListDetail(res)
    } catch (error) {
      console.log("error", error)
    }
  }

  useEffect(() => {
    init(id)
  }, [id])

  const loading = useLoading()

  const label =
    playListDetail?.playlist?.creator?.expertTags || playListDetail?.playlist?.tags || []

  const commentTabContent = playListDetail?.playlist?.commentCount
    ? `评论(${Utils.formatCommentNumber(playListDetail?.playlist?.commentCount)})`
    : "评论"

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
        <>
          <HotComment type={2} id={id} />
          <NewComment type={2} id={id} />
        </>
      )
    },
    {
      label: "收藏者",
      key: "3",
      children: <Collection subscribedCount={playListDetail?.playlist?.subscribedCount} />
    }
  ]

  return (
    <Space direction="vertical" className={styles._playList} size={0}>
      <Space className={styles.top} size={16}>
        <Avatar
          icon={<CustomerServiceOutlined />}
          size={200}
          shape="square"
          alt="资源加载异常"
          src={`${playListDetail?.playlist.creator.backgroundUrl}?param=200y200`}
        />

        <Space direction="vertical" size={12}>
          <Space className={styles.name}>
            <span className={styles.colorLabel}>歌单</span>
            <span className={styles.markTitle}>{playListDetail?.playlist?.name}</span>
            {!playListDetail?.playlist?.subscribed ? (
              <EditOutlined
                onClick={() => history.push(`/edit-song-list?id=${playListDetail?.playlist?.id}`)}
              />
            ) : null}
          </Space>
          <Space className={styles.name}>
            <Avatar
              icon={<CustomerServiceOutlined />}
              size={40}
              shape="square"
              alt="资源加载异常"
              src={`${playListDetail?.playlist?.creator.avatarUrl}?param=40y40`}
            />
            <a onClick={() => history.push(`/homepage?uid=${playListDetail?.playlist?.userId}`)}>
              {playListDetail?.playlist?.creator.nickname}
            </a>
            <Space>
              <span>{dayjs(playListDetail?.playlist?.createTime).format("YYYY-MM-DD")}</span>
              <i>创建</i>
            </Space>
          </Space>
          <Space>
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
          </Space>
          {label && (
            <Space>
              <span>标签:</span>
              <Space split="/">
                {label.map((item: any, index: number) => {
                  return (
                    <a onClick={() => history.push(`/find-music/song-list?tag=${item}`)} key={item}>
                      {item}
                    </a>
                  )
                })}
              </Space>
            </Space>
          )}
          <Space>
            <span>歌曲数：{playListDetail?.playlist?.trackCount || 0}</span>
            <span>播放数：{Utils.tranNumber(+playListDetail?.playlist?.playCount!, 0) || 0}</span>
          </Space>
          <Space className={styles.introduction}>
            <span>简介：</span>
            <span className={classNames(styles.des, "leading-[18px]")}>
              {playListDetail?.playlist?.description}
            </span>
          </Space>
        </Space>
      </Space>

      <Tabs
        defaultActiveKey="1"
        // tabBarExtraContent={
        //   isSearch && (
        //     <Search placeholder="搜索歌单音乐" onChange={(e) => setSearchValue(e.target.value)} />
        //   )
        // }
        className={styles.tabs}
        tabBarStyle={{margin: 0}}
        items={items}></Tabs>
    </Space>
  )
}

export default PlayList
