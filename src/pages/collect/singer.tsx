/** @format */

import React, {useEffect} from "react"
import {List, Spin, Avatar, Space} from "antd"
import {useRequest} from "ahooks"
import {history} from "umi"
import API from "@/api"
import styles from "./index.scss"

interface ISInger {
  info: string
  id: number
  name: string
  trans: null | string
  alias: any[]
  albumSize: number
  mvSize: number
  picId: number
  picUrl: string
  img1v1Url: string
}

interface IData {
  data: ISInger[]
  hasMore: boolean
  count: number
  code: number
}

const Singer = () => {
  const {data, run, loading} = useRequest<IData>(API.artistSublist, {
    manual: true
  })
  const artistDescription = (item: ISInger) => {
    return (
      <div className={styles.albumDescription}>
        <span className={styles.name}>{item.name}</span>
        <Space className={styles.album}>
          <span>专辑:</span>
          <span>{item.albumSize}</span>
        </Space>
        <Space className={styles.mvSize}>
          <span>MV:</span>
          <span>{item.mvSize}</span>
        </Space>
      </div>
    )
  }

  useEffect(() => {
    run()
  }, [])
  return (
    <Spin spinning={loading} tip="Loading...">
      <List
        itemLayout="horizontal"
        locale={{emptyText: "暂无收藏歌手"}}
        dataSource={data?.data}
        renderItem={(item) => (
          <List.Item
            onClick={() => history.push(`/singer?id=${item.id}`)}
            className={styles.albumItem}>
            <List.Item.Meta avatar={<Avatar src={item.picUrl} />} title={artistDescription(item)} />
          </List.Item>
        )}
      />
    </Spin>
  )
}

Singer.title = "收藏专辑"

export default Singer
