/** @format */

import React, {FC} from "react"
import Utils from "@/help"
import {CaretRightOutlined} from "@ant-design/icons"
import {history} from 'umi'
import styles from '../index.scss'

export interface SimiInterface {
  id: number
  cover: string
  name: string
  playCount: number
  briefDesc: string
  desc: string | null
  artistName: string
  artistId: number
  duration: number
  mark: number
  artists: {
    id: number
    name: string
    alias: any[]
    transNames: string | null
  }[]
  alg: string
}

interface PropsInterface {
  data: SimiInterface
}

const SimiDetail: FC<PropsInterface> = ({data}) => {
  const onMv = (mvid:number) => {
    history.push({
      pathname:'/recommend/video/mvDetail',
      query:{mvid}
    })
  }
  return (
    <div className={styles.simiItem} onClick={() =>onMv(data.id)}>
      <div className={styles.left}>
        <img src={data.cover} />
        <span className={styles.playCount}>
          <CaretRightOutlined />
          {Utils.tranNumber(data.playCount, 2)}
        </span>
        <span className={styles.time}>{Utils.formatPlayerTime(data.duration / 1000)}</span>
      </div>
      <p className={styles.right}>
        {data.name}-{Utils.formatName(data.artists)}
      </p>
    </div>
  )
}
export default SimiDetail
