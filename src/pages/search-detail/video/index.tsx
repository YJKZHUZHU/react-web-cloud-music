/** @format */

import React, {FC, useEffect} from "react"
import {Spin, Row, Col, Space} from "antd"
import {VideoCameraOutlined} from "@ant-design/icons"
import {useHistory} from "umi"
import InfiniteScroll from "react-infinite-scroller"
import {Artists} from "@/components"
import useSearchDetail from "../hooks/useSearchDetail"
import Utils from "@/help"
import styles from "../index.scss"

interface IVideo {
  getCount: (count: number) => void
}

const Video: FC<IVideo> = ({getCount}) => {
  const history = useHistory()
  const {loadMore, loading, more, list, count} = useSearchDetail({
    type: 1014,
    initFetch: true,
    countName: "videoCount",
    listName: "videos"
  })

  useEffect(() => {
    getCount(count)
  }, [count])

  const onMv = (id: number, type: number) => {
    history.push(`/recommend/video/mvdetail?mvid=${id}&type=${type}`)
  }

  const mapArtists = (data: any[]) => {
    return data.map((item) => {
      return {
        name: item.userName,
        id: item.userId
      }
    })
  }

  return (
    <div className={styles.video}>
      <InfiniteScroll
        initialLoad={false}
        pageStart={1}
        loadMore={loadMore}
        hasMore={!loading && more}
        useWindow={false}>
        <div className={styles._videoList}>
          <Row justify="space-around" gutter={16}>
            {list.map((item: any) => {
              return (
                <Col span={4} key={item.vid}>
                  <div className={styles.card}>
                    <div className={styles.top}>
                      <div className={styles.img} onClick={() => onMv(item.vid, item.type)}>
                        <img src={item.coverUrl} />
                      </div>
                      <p className={styles.playNumber}>
                        <VideoCameraOutlined className={styles.icon} />
                        <span className={styles.number}>
                          {item.playTime && Utils.tranNumber(item.playTime, 2)}
                        </span>
                      </p>
                      <p className={styles.time}>
                        {Utils.formatPlayerTime(item.durationms / 1000)}
                      </p>
                    </div>
                    <div className={styles.bottom}>
                      <p className={styles.content} onClick={() => onMv(item.mvid, item.type)}>
                        {+item.type === 0 ? <span className={styles.mv}>MV</span> : null}
                        <span className={styles.right}>{item.title}</span>
                      </p>
                      {item.creator && (
                        <Space className={styles.title}>
                          <span>{item.type && +item.type === 1 ? "by" : null}</span>

                          <Artists data={mapArtists(item.creator)} />
                        </Space>
                      )}
                    </div>
                  </div>
                </Col>
              )
            })}
          </Row>
        </div>
      </InfiniteScroll>
      {loading && more && (
        <div className={styles.loading}>
          <Spin spinning={loading} tip="Loading..." />
        </div>
      )}
    </div>
  )
}
Video.title = "视频"

export default Video
