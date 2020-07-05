/** @format */

import React, {FC} from "react"
import {VideoCameraOutlined} from "@ant-design/icons"
import {Row, Col, Spin} from "antd"
import styles from "../index.scss"
import Utils from "@/help/index"

type Props = {
  data: any[]
  loading: boolean
  hasMore: boolean
  type: number
}
const VideoList: FC<Props> = (props) => {
  const {data, loading, hasMore} = props
  return (
    <div className={styles._videoList}>
      <Row justify="space-around" gutter={32}>
        {data.map((item: any) => {
          return (
            <Col span={4} key={item.vid}>
              <div className={styles.card}>
                <div className={styles.top}>
                  <div className={styles.img}>
                    <img src={item.coverUrl} />
                  </div>
                  <p className={styles.playNumber}>
                    <VideoCameraOutlined className={styles.icon} />
                    <span className={styles.number}>
                      {item.playTime && Utils.tranNumber(item.playTime, 2)}
                    </span>
                  </p>
                  <p className={styles.time}>{Utils.formatPlayerTime(item.durationms / 1000)}</p>
                </div>
                <div className={styles.bottom}>
                  <p className={styles.content}>
                    {+item.type === 0 ? <span className={styles.mv}>MV</span> : null}
                    <span className={styles.right}>{item.title}</span>
                  </p>
                  {item.creator && (
                    <p className={styles.title}>
                      {item.type && +item.type === 1 ? "by" : null}
                      {item.creator.map((items: any, index: number) => {
                        return (
                          <span key={items.userId}>
                            {items.userName}
                            {item.creator.length === index + 1 ? null : "/"}
                          </span>
                        )
                      })}
                    </p>
                  )}
                </div>
              </div>
            </Col>
          )
        })}
      </Row>
      {loading && (
        <div className="demo-loading-container">
          <Spin />
        </div>
      )}
    </div>
  )
}

export default VideoList
