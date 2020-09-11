/** @format */

import React, {useEffect, useState} from "react"
import {
  FolderAddOutlined,
  PlayCircleOutlined,
  PlusOutlined,
  ShareAltOutlined,
  CheckOutlined
} from "@ant-design/icons"
import {Divider, Button, Tabs, Input, message, Space} from "antd"
import {Link, history, useSelector, useDispatch, SongInfoModelState} from "umi"
import API from "@/api"
import TableList from "./components/ListTable"
import CommentList from "./components/CommentList"
import Collection from "./components/Collection"
import moment from "moment"
import Utils from "@/help"
import styles from "./index.scss"

const {TabPane} = Tabs
const {Search} = Input

let playRecords: any[] = []

const PlayList = () => {
  let times = 0

  const {listId} = history.location.query
  const [playlist, setPlaylist] = useState<any>({})
  const [creator, setCreator] = useState<any>({})
  const [label, setLabel] = useState([])
  const [isSearch, setSearch] = useState(true)
  const [searchValue, setSearchValue] = useState("")
  const dispatch = useDispatch()

  const {playRecord} = useSelector((state: any): SongInfoModelState => state.songInfoModel)

  const onTabs = (activeKey: string) => (+activeKey === 1 ? setSearch(true) : setSearch(false))

  const onPlayAll = () => {
    times++
    if (times === 1) {
      dispatch({type: "songInfoModel/getSongInfo", payload: {id: playRecords[0].id}})
      dispatch({
        type: "songInfoModel/setPlayRecordTip",
        payload: {
          playRecordTip: "歌单已更新"
        }
      })

      return dispatch({
        type: "songInfoModel/setPlayRecord",
        payload: {
          playRecord: Utils.removeRepeat(playRecords.concat(playRecord), "id")
        }
      })
    }

    message.info("已经添加过了哦")
    dispatch({
      type: "songInfoModel/setPlayRecordTip",
      payload: {
        playRecordTip: ""
      }
    })
  }

  const getData = async () => {
    try {
      const Ret = await API.playList({id: listId, loading: true})
      if (Ret.code !== 200) return message.info("歌单获取异常，请稍后再试")
      setPlaylist(Ret.playlist)
      setCreator({
        ...Ret.playlist.creator
      })
      return setLabel(Ret.playlist.creator.expertTags || Ret.playlist.tags || [])
    } catch (error) {
      return message.info("歌单获取异常，请稍后再试")
    }
  }

  useEffect(() => {
    getData()
  }, [listId])

  return (
    <div className={styles._playList}>
      <div className={styles.top}>
        <div className={styles.left}>
          <img src={creator.backgroundUrl} />
        </div>
        <div className={styles.right}>
          <div className={styles.title}>
            <div className={styles.markTitle}>
              <span className={styles.colorLabel}>歌单</span>
              <h2 className={styles.markTitle}>{playlist.name}</h2>
            </div>
            <div className={styles.songIntroduction}>
              <p>
                <span>歌曲数</span>
                <span className={styles.number}>{playlist.trackCount}</span>
              </p>
              <Divider type="vertical" className={styles.divider} />
              <p>
                <span>播放数</span>
                <span className={styles.number}>{Utils.tranNumber(+playlist.playCount, 0)}</span>
              </p>
            </div>
          </div>
          <div className={styles.creator}>
            <div className={styles.link}>
              <img src={creator.avatarUrl} alt={creator.avatarUrl} />
            </div>
            <span className={styles.name}>{creator.nickname}</span>
            <span className={styles.time}>
              {moment(playlist.createTime).format("YYYY-MM-DD")}
              <i style={{paddingLeft: 5}}>创建</i>
            </span>
          </div>
          <Space className={styles.btnGroup}>
            <Button onClick={onPlayAll} type="primary">
              <PlayCircleOutlined />
              播放全部
              <PlusOutlined />
            </Button>
            <Button type="primary">
              {playlist.subscribed ? <CheckOutlined /> : <FolderAddOutlined />}
              {playlist.subscribed ? "已收藏" : "收藏"}(
              {Utils.tranNumber(playlist.subscribedCount, 0)})
            </Button>
            <Button type="primary">
              <ShareAltOutlined />
              分享({Utils.tranNumber(playlist.shareCount, 0)})
            </Button>
          </Space>
          {/* <div className={styles.btnGroup}></div> */}
          {label.length !== 0 ? (
            <div className={styles.label}>
              <p>标签：</p>
              <div>
                {label.map((item: any, index: number) => {
                  return (
                    <span key={item}>
                      <Link to="/" className={styles.link}>
                        {item}
                        {index + 1 === label.length ? null : "/"}
                      </Link>
                    </span>
                  )
                })}
              </div>
            </div>
          ) : null}

          <p className={styles.introduction}>
            <b>简介：</b>
            {playlist.description}
          </p>
        </div>
      </div>
      <Tabs
        animated={false}
        defaultActiveKey="1"
        tabBarExtraContent={
          isSearch ? (
            <Search placeholder="搜索歌单音乐" onChange={(e) => setSearchValue(e.target.value)} />
          ) : null
        }
        className={styles.tabs}
        tabBarStyle={{margin: 0}}
        onChange={onTabs}>
        <TabPane tab="歌曲列表" key="1">
          <TableList
            trackIds={playlist.trackIds}
            tracks={playlist.tracks}
            searchValue={searchValue}
            getRecord={(record: any[]) => (playRecords = record)}
          />
        </TabPane>
        <TabPane
          tab={
            playlist.commentCount
              ? `评论(${Utils.formatCommentNumber(playlist.commentCount)})`
              : "评论"
          }
          key="2">
          <CommentList />
        </TabPane>
        <TabPane tab="收藏者" key="3">
          <Collection subscribedCount={playlist.subscribedCount} />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default PlayList
