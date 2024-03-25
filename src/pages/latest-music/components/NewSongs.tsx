/** @format */

import React, {useEffect, useState, FC} from "react"
import {useDispatch, history} from "umi"
import {Tabs, Spin, Space} from "antd"
import {CaretRightOutlined, PlaySquareOutlined} from "@ant-design/icons"
import {useRequest} from "ahooks"
import {Artists, PlayIcon, VideoIcon} from "@/components"
import API from "@/api"
import Utils from "@/help"
import {NEW_SONGS_TAB_MAP} from "@/help/map"
import styles from "../index.scss"

const {TabPane} = Tabs

interface IArtists {
  img1v1Id: number
  topicPerson: number
  picId: number
  followed: boolean
  alias: any[]
  albumSize: number
  img1v1Url: string
  picUrl: string
  trans: string
  musicSize: number
  briefDesc: string
  name: string
  id: number
  img1v1Id_str: string
}

interface IMusic {
  dfsId: number
  playTime: number
  volumeDelta: number
  bitrate: number
  sr: number
  name: null | string
  id: number
  size: number
  extension: string
}

interface IAlbum {
  songs: any[]
  paid: boolean
  onSale: boolean
  tags: string
  artists: IArtists[]
  copyrightId: number
  commentThreadId: string
  picId: number
  artist: IArtists
  alias: any[]
  publishTime: number
  picUrl: string
  status: number
  company: string
  blurPicUrl: string
  companyId: number
  pic: number
  subType: string
  description: string
  briefDesc: string
  name: string
  id: number
  type: string
  size: number
  picId_str: string
}

interface IPrivilege {
  id: number
  fee: number
  payed: number
  st: number
  pl: number
  dl: number
  sp: number
  cp: number
  subp: number
  cs: boolean
  maxbr: number
  fl: number
  toast: boolean
  flag: number
  preSell: boolean
}

interface IListItem {
  starred: boolean
  popularity: number
  starredNum: number
  playedNum: number
  dayPlays: number
  hearTime: number
  mp3Url: string
  rtUrls: null | string
  artists: IArtists[]
  bMusic: IMusic
  fee: number
  score: number
  copyrightId: number
  commentThreadId: string
  album: IAlbum
  mMusic: IMusic
  lMusic: IMusic
  alias: any[]
  hMusic: IMusic
  mvid: number
  ftype: number
  rtype: number
  duration: number
  status: number
  ringtone: string
  disc: string
  no: number
  position: number
  name: string
  id: number
  exclusive: boolean
  privilege: IPrivilege
}

interface IData {
  code: number
  data: IListItem[]
}

interface IList {
  active: string
  tip: string
}

const List: FC<IList> = ({active, tip}) => {
  const dispatch = useDispatch()

  const {data, loading, run} = useRequest<IData>(() => API.getLatestMusic({type: active}), {
    manual: true
  })

  useEffect(() => {
    run()
  }, [])

  return (
    <Spin spinning={loading} tip={`${tip}新歌加载中。。。`}>
      <div className={styles.list}>
        <ul>
          {data?.data?.map((item, index) => {
            return (
              <li
                className={styles.item}
                key={item.id}
                onDoubleClick={() =>
                  dispatch({
                    type: "songInfoModel/getSongInfo",
                    payload: {
                      id: item.id
                    }
                  })
                }>
                <span className={styles.number}>{index < 9 ? `0${index + 1}` : index + 1}</span>
                <div className={styles.img}>
                  <img src={item.album.picUrl} />
                  <PlayIcon iconClassName={styles.icon} className={styles.playFont} />
                </div>
                <Space className={styles.content}>
                  <span>{item.name}</span>
                  {item.alias.length ? (
                    <i className={styles.smallTip} key={index}>
                      ({item.alias.join()})
                    </i>
                  ) : null}
                  {!!item.mvid ? <VideoIcon id={item.mvid} type={0} /> : null}
                </Space>
                <p className={styles.name}>
                  <Artists data={item.artists} />
                </p>
                <p className={styles.title}>
                  <span className={styles.name}>{item.album.name}</span>
                  {item.alias.length !== 0 ? (
                    <i className={styles.smallTip} key={index}>
                      ({item.alias.join()})
                    </i>
                  ) : null}
                </p>
                <p className={styles.time}>{Utils.formatPlayerTime(item.duration / 1000)}</p>
              </li>
            )
          })}
        </ul>
      </div>
    </Spin>
  )
}

const NewSongs = () => {
  const [active, setActive] = useState("0")
  return (
    <Tabs defaultActiveKey="0" onChange={(value) => setActive(value)} activeKey={active} animated>
      {NEW_SONGS_TAB_MAP.map((item) => {
        return (
          <TabPane tab={item.name} key={item.key}>
            <List active={active} tip={item.name} />
          </TabPane>
        )
      })}
    </Tabs>
  )
}

export default NewSongs
