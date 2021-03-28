/** @format */

import React, {useState, useEffect, FC} from "react"
import {Tabs, Spin, List, Space, Avatar} from "antd"
import { useHistory, useLocation } from "umi"
import { useRequest } from "ahooks"
import API from "@/api"
import Utils from "@/help"
import moment from "moment"
import styles from "./index.scss"

const { TabPane } = Tabs

interface IArtists {
  img1v1Id: number
  topicPerson: number
  alias: any[]
  picId: number
  briefDesc: string
  albumSize: number
  musicSize: number
  followed: boolean
  img1v1Url: string
  trans: string
  picUrl: string
  name: string
  id: number
  img1v1Id_str: string
}

interface IAlbum {
  subTime: number
  msg: any[]
  alias: string[]
  artists: IArtists[]
  picId: number
  picUrl: string
  name: string
  id: number
  size: number
  transNames: any[]
}

export interface IAlbumData {
  data: IAlbum[]
  hasMore: boolean
  count: number
  code: number
  paidCount: number
}

interface IData {
  programCount: number
  djRadioCount: number
  mvCount: number
  artistCount: number
  newProgramCount: number
  createDjRadioCount: number
  createdPlaylistCount: number
  subPlaylistCount: number
  code: number
}

const INIT_DATA = {
  programCount: 0,
  djRadioCount: 0,
  mvCount: 0,
  artistCount: 0,
  newProgramCount: 0,
  createDjRadioCount: 0,
  createdPlaylistCount: 0,
  subPlaylistCount: 0,
  code: 200
}

const Collect: FC = ({ children }) => {
  const history = useHistory()
  const location = useLocation()
  const path =
    location.pathname.split("/").pop() === "collect" ? "album" : location.pathname.split("/").pop()
  const [key, setTabKey] = useState(path || "album")

  const { data, run } = useRequest<IData>(API.subCount, {
    manual: true,
    initialData: INIT_DATA
  })

  const { data: albumData, run: runAlbum, loading } = useRequest<IAlbumData>(API.albumSublist, {
    manual: true
  })

  const callback = (activeKey: string) => {
    setTabKey(activeKey)
    history.push(`/my-music/collect/${activeKey}`)
  }

  const albumDescription = (item: IAlbum) => {
    return (
      <div className={styles.albumDescription}>
        <Space className={styles.artists}>
          <span>{Utils.formatName(item.artists)}</span>
          <span>({item.size}首)</span>
        </Space>
        <Space className={styles.time}>
          <span>发布时间</span>
          <span>{moment(item.subTime).format("YYYY-MM-DD HH:mm:ss")}</span>
        </Space>
      </div>
    )
  }

  useEffect(() => {
    run()
    runAlbum()
  }, [])

  return (
      <Tabs className={styles._collect} activeKey={key} onChange={callback}>
        <TabPane tab={`专辑 ${albumData?.count || 0}`} key="album">
          <Spin spinning={loading} tip="Loadiing...">
            <List
              itemLayout="horizontal"
              locale={{emptyText: "暂无收藏专辑"}}
              dataSource={albumData?.data}
              renderItem={(item) => (
                <List.Item
                  onClick={() => history.push(`/album?id=${item.id}`)}
                  className={styles.albumItem}>
                  <List.Item.Meta
                    avatar={<Avatar src={item.picUrl} />}
                    title={
                      <Space>
                        <span className={styles.name}>{item.name}</span>
                        {item.alias.length !== 0 ? <span>({item.alias.join()})</span> : null}
                      </Space>
                    }
                    description={albumDescription(item)}
                  />
                </List.Item>
              )}
            />
          </Spin>
        </TabPane>
        <TabPane tab={`歌手 ${data?.artistCount}`} key="singer">
          {children}
        </TabPane>
        <TabPane tab={`视频  ${data?.mvCount}`} key="video">
          {children}
        </TabPane>
      </Tabs>
  )
}

export default Collect

