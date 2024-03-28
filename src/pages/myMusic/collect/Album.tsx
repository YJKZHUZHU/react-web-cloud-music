/** @format */

import React, {FC} from "react"
import {List, Spin, Avatar, Space} from "antd"
import {history} from "@umijs/max"
import dayjs from "dayjs"
import Utils from "@/help"
import styles from "./index.scss"

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
interface IAlbumProps {
  data: IAlbumData
  loading: boolean
}
const Album: FC<IAlbumProps> = ({data, loading}) => {
  const albumDescription = (item: IAlbum) => {
    return (
      <div className={styles.albumDescription}>
        <Space className={styles.artists}>
          <span>{Utils.formatName(item.artists)}</span>
          <span>({item.size}首)</span>
        </Space>
        <Space className={styles.time}>
          <span>发布时间</span>
          <span>{dayjs(item.subTime).format("YYYY-MM-DD HH:mm:ss")}</span>
        </Space>
      </div>
    )
  }
  return (
    <Spin spinning={loading} tip="Loadiing...">
      <List
        itemLayout="horizontal"
        locale={{emptyText: "暂无收藏专辑"}}
        dataSource={data?.data}
        renderItem={(item) => (
          <List.Item
            onClick={() => history.push(`/album/song-list?id=${item.id}`)}
            className={styles.albItem}>
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
  )
}

export default Album
