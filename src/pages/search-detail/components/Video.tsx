/** @format */

import React, {FC, useEffect} from "react"
import {Spin, Row, Col, Space} from "antd"
import {VideoCameraOutlined} from "@ant-design/icons"
import {useHistory} from "umi"
import {useSearchDetail} from "@/hooks"
import {Artists} from "@/components"
import Utils from "@/help"
import {IComProps} from "../_layout"
import styles from "../index.scss"

const Video: FC<IComProps> = ({getCount}) => {
  const history = useHistory()

  const {request, containerRef} = useSearchDetail({
    countKey: "videoCount",
    listKey: "videos",
    type: 1014,
    limit: 30
  })

  const mapArtists = (data: any[]) => {
    return data.map((item) => {
      return {
        name: item.userName,
        id: item.userId
      }
    })
  }

  useEffect(() => {
    getCount(1014, request?.data?.total)
  }, [request])

  return (
    <div className={styles.video} ref={containerRef}>
      <Spin spinning={request?.loadingMore} tip="Loading..." className={styles.loading}>
        <div className={styles._videoList}>
          <Row justify="space-around" gutter={16}>
            {request?.data?.list?.map((item: any) => {
              return (
                <Col span={4} key={item.vid}>
                  <div className={styles.card}>
                    <div className={styles.top}>
                      <div
                        className={styles.img}
                        onClick={() =>
                          history.push(
                            `/recommend/video/mvdetail?mvid=${item.vid}&type=${item.type}`
                          )
                        }>
                        <img src={item.coverUrl} />
                      </div>
                      <p className={styles.playNumber}>
                        <VideoCameraOutlined className={styles.icon} />
                        <span>{item.playTime && Utils.tranNumber(item.playTime, 2)}</span>
                      </p>
                      <p className={styles.time}>
                        {Utils.formatPlayerTime(item.durationms / 1000)}
                      </p>
                    </div>
                    <div className={styles.bottom}>
                      <p
                        className={styles.content}
                        onClick={() =>
                          history.push(
                            `/recommend/video/mvdetail?mvid=${item.vid}&type=${item.type}`
                          )
                        }>
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
      </Spin>
    </div>
  )
}
Video.title = "视频"

export default Video
