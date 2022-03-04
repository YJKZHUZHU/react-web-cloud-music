/** @format */

import React, {FC, useEffect} from "react"
import {CaretRightOutlined} from "@ant-design/icons"
import {Row, Col, Spin} from "antd"
import styles from "./index.scss"
import Utils from "@/help"
import {history} from "umi"

export interface IAllTopListItem {
  ToplistType: string
  adType: number
  anonimous: boolean
  artists: any
  backgroundCoverId: number
  backgroundCoverUrl: any
  cloudTrackCount: number
  commentThreadId: string
  coverImgId: number
  coverImgId_str: string
  coverImgUrl: string
  createTime: number
  creator: any
  description: string
  englishTitle: any
  highQuality: boolean
  id: number
  name: string
  newImported: boolean
  opRecommend: boolean
  ordered: boolean
  playCount: number
  privacy: number
  recommendInfo: any
  specialType: any
  status: number
  subscribed: any
  subscribedCount: number
  subscribers: any[]
  tags: any[]
  titleImage: number
  titleImageUrl: any
  totalDuration: number
  trackCount: number
  trackNumberUpdateTime: number
  trackUpdateTime: number
  tracks: any
  updateFrequency: string
  updateTime: number
  userId: number
}

interface AllTopLIstInterface {
  data?: any[]
}

const AllTopList: FC<AllTopLIstInterface> = ({data}) => {
  return (
    <div className={styles._allTopList}>
      <Row gutter={32}>
        {data?.map((item: any) => {
          return (
            <Col key={item.id} span={4}>
              <div
                className={styles.item}
                onClick={() => history.push(`/playList/${item.id}?listId=${item.id}`)}>
                <img src={item.coverImgUrl} className={styles.img} />
                <div className={styles.count}>{Utils.tranNumber(item.playCount, 2)}</div>
                <div className={styles.playIcon}>
                  <CaretRightOutlined />
                </div>
                <p className={styles.name}>{item.name}</p>
              </div>
            </Col>
          )
        })}
      </Row>
    </div>
  )
}

export default AllTopList
