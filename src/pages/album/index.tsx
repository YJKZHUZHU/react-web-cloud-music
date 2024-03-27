/** @format */

import React, { FC, useEffect, useState, createContext } from "react"
import { useRequest } from "ahooks"
import { Space, Tag, Button, Tabs, message, Spin } from "antd"
import {
  PlayCircleOutlined,
  PlusSquareOutlined,
  ShareAltOutlined,
  CheckOutlined
} from "@ant-design/icons"
import { useQuery } from '@/hooks'
import { history } from "@umijs/max"
import moment from "moment"
import API from "@/api"
import styles from "./index.scss"
import qs from "qs"

const { TabPane } = Tabs

interface IAlbumContext<T = any> {
  data: T
}

export const AlbumContext = createContext<IAlbumContext>({ data: null })

const Album: FC = ({ children }) => {
  const query = useQuery()
  const { source = "song-list" } = query
  const [tabKey, setTabKey] = useState(source)



  const callback = (activeKey: string) => {
    const target = qs.stringify({ ...query, source: activeKey })
    setTabKey(activeKey)
    history.push({
      pathname: `/album/${activeKey}?${target}`,

    })
  }

  const { data, loading, run } = useRequest(() => API.getAlbumContent({ ...query }), {
    manual: true
  })
  const { data: albInfo, run: runInfo } = useRequest(
    () => API.getAlbumDetailDynamic({ ...query }),
    {
      manual: true
    }
  )
  const { run: runSetAlbumSub } = useRequest(
    () => API.setAlbumSub({ ...query, t: albInfo?.isSub ? -1 : 1 }),
    {
      manual: true,
      onSuccess: async () => {
        await runInfo()
        albInfo?.isSub ? message.success("取消收藏") : message.success("收藏成功")
      }
    }
  )

  useEffect(() => {
    setTabKey(source)
  }, [source])

  useEffect(() => {
    run()
    runInfo()
  }, [])

  return (
    <div className={styles.album}>
      <Spin spinning={loading} tip="Loading...">
        <div className={styles.desc}>
          <div className={styles.img}>
            <img src={data?.album?.info?.commentThread?.resourceInfo?.imgUrl} alt="专辑" />
          </div>
          <Space direction="vertical" size={12}>
            <Space>
              <Tag className={styles.tag}>专辑</Tag>
              <Space>
                <span className={styles.topName}>{data?.album?.name}</span>
                <span className={styles.extra}>
                  {data?.album?.alias?.length !== 0 ? data?.album?.alias?.join() : null}
                </span>
              </Space>
            </Space>
            <Space>
              <Button type="primary" shape="round">
                <PlayCircleOutlined />
                播放全部
              </Button>
              <Button shape="round" onClick={runSetAlbumSub}>
                {albInfo?.isSub ? <CheckOutlined /> : <PlusSquareOutlined />}
                {albInfo?.isSub ? "已收藏" : "收藏"}({albInfo?.subCount})
              </Button>
              <Button shape="round">
                <ShareAltOutlined />
                分享({albInfo?.shareCount})
              </Button>
            </Space>
            <Space>
              <span>歌手:</span>
              <span
                className={styles.name}
                onClick={() =>
                  history.push(
                    `/artists-detail/album?id=${data?.album?.artist?.id}&name=${data?.album?.artist?.name}`
                  )
                }>
                {data?.album?.artist?.name}
              </span>
            </Space>
            <Space>
              <span>时间:</span>
              <span>{moment(data?.album.publishTime).format("YYYY-MM-Dd")}</span>
            </Space>
          </Space>
        </div>
        <Tabs activeKey={tabKey} onChange={callback} tabBarStyle={{ margin: 0 }}>
          <TabPane tab="歌曲列表" key="song-list">
            <AlbumContext.Provider value={{ data }}>{children}</AlbumContext.Provider>
          </TabPane>
          <TabPane tab={`评论(${albInfo?.commentCount})`} key="comment">
            {children}
          </TabPane>
          <TabPane tab="专辑详情" key="detail">
            <AlbumContext.Provider value={{ data }}>
              {children}
            </AlbumContext.Provider>
          </TabPane>
        </Tabs>
      </Spin>
    </div>
  )
}

export default Album
