/** @format */

import React, {FC, useEffect, useState} from "react"
import {useRequest} from "ahooks"
import {Space, Tag, Button, Tabs, message, Spin} from "antd"
import {
  PlayCircleOutlined,
  PlusSquareOutlined,
  ShareAltOutlined,
  CheckOutlined
} from "@ant-design/icons"
import {useLocation, history} from "umi"
import moment from "moment"
import {NewComment,HotComment} from '@/components'
import List from "./list"
import Detail from "./detail"
import API from "@/api"
import styles from "./index.scss"

const {TabPane} = Tabs

const Album: FC = () => {
  const location: any = useLocation()
  const path =
    location.pathname.split("/").pop() === "album" ? "list" : location.pathname.split("/").pop()

  const [tabKey, setTabKey] = useState(path || "list")

  const {id} = location.query

  const callback = (activeKey: string) => {
    setTabKey(activeKey)
    history.push({
      pathname: `/album/${activeKey}`,
      query: {...location.query}
    })
  }

  const {data, loading, run} = useRequest(() => API.getAlbumContent({...location.query}), {
    manual: true
  })
  const {data: albumInfo, run: runInfo} = useRequest(
    () => API.getAlbumDetailDynamic({...location.query}),
    {
      manual: true
    }
  )
  const {run: runSetAlbumSub} = useRequest(
    () => API.setAlbumSub({...location.query, t: albumInfo?.isSub ? -1 : 1}),
    {
      manual: true,
      onSuccess: async () => {
        await runInfo()
        albumInfo?.isSub ? message.success("取消收藏") : message.success("收藏成功")
      }
    }
  )

  useEffect(() => {
    setTabKey(path)
  }, [path])

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
                {albumInfo?.isSub ? <CheckOutlined /> : <PlusSquareOutlined />}
                {albumInfo?.isSub ? "已收藏" : "收藏"}({albumInfo?.subCount})
              </Button>
              <Button shape="round">
                <ShareAltOutlined />
                分享({albumInfo?.shareCount})
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
                {data?.album.artist?.name}
              </span>
            </Space>
            <Space>
              <span>时间:</span>
              <span>{moment(data?.album.publishTime).format("YYYY-MM-Dd")}</span>
            </Space>
          </Space>
        </div>
        <Tabs activeKey={tabKey} onChange={callback} tabBarStyle={{margin: 0}}>
          <TabPane tab="歌曲列表" key="list">
            <List list={data?.songs} />
          </TabPane>
          <TabPane tab={`评论(${albumInfo?.commentCount})`} key="comment">
            <HotComment type={3} id={id} />
            <NewComment type={3} id={id} />
          </TabPane>
          <TabPane tab="专辑详情" key="detail">
            <Detail data={data?.album?.description} />
          </TabPane>
        </Tabs>
      </Spin>
    </div>
  )
}

export default Album
