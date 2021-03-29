/** @format */

import React, {useRef} from "react"
import {Row, Col, Spin, message} from "antd"
import {useHistory} from "umi"
import {useRequest} from "ahooks"
import {PlayIcon} from "@/components"
import API from "@/api"
import styles from "./index.scss"

interface IList {
  id: number
  url: string
  picUrl: string
  sPicUrl: string
  type: number
  copywriter: string
  name: string
  time: number
  videoId: number
}

const ExclusiveBroadcast = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const history = useHistory()

  const {data, loadingMore} = useRequest(
    (d) => API.getExclusiveBroadcastList({offset: d?.list?.length || 0, limit: 60}),
    {
      loadMore: true,
      ref: containerRef,
      isNoMore: (d: any) => !d.hasMore,
      formatResult: (response) => {
        return {
          list: response.code === 200 ? response.result : [],
          total: 100,
          hasMore: response.code === 200 ? response.more : false
        }
      }
    }
  )

  const onLink = (item: IList) => {
    if (+item.type === 5) {
      return history.push(`/mv-detail?mvid=${item.id}&type=0`)
    }
    if (+item.type === 24) {
      return history.push(`/mv-detail?mvid=${item.videoId}&type=1`)
    }
    return message.info("该视频暂时无法播放哦")
  }

  return (
    <div className={styles.exclusiveBroadcast} ref={containerRef}>
      <Spin spinning={loadingMore} tip="Loading..." className={styles.loading}>
        <Row gutter={32}>
          {data?.list?.map((item: IList) => {
            return (
              <Col span={6} key={item.picUrl} onClick={() => onLink(item)}>
                <div className={styles.img}>
                  <PlayIcon iconClassName={styles.playIcon} />
                  <img src={item.sPicUrl} />
                </div>
                <span className={styles.name}>{item.name}</span>
              </Col>
            )
          })}
        </Row>
      </Spin>
    </div>
  )
}
ExclusiveBroadcast.title = "独家放送"

export default ExclusiveBroadcast
