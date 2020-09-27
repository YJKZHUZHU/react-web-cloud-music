/** @format */

import React, {FC} from "react"
import {PlayCircleOutlined} from "@ant-design/icons"
import {Link} from "umi"
import styles from "./index.scss"

export interface IExclusiveBroadcastItem {
  id: number
  url: string
  picUrl: string
  sPicUrl: string
  type: number
  copywriter: string
  name: string
  alg: string
  videoId: number
}

interface IExclusiveBroadcast {
  data: IExclusiveBroadcastItem
}

const ExclusiveBroadcast: FC<IExclusiveBroadcast> = ({data}) => {
  const onLink = (item: IExclusiveBroadcastItem) => {
    let result = ""
    if (+item.type === 5) {
      result = `/recommend/video/mvdetail?mvid=${item.id}&type=0`
    }
    if (+item.type === 24) {
      result = `/recommend/video/mvdetail?mvid=${item.videoId}&type=1`
    }
    return result
  }
  return (
    <Link to={onLink(data)} className={styles.exclusiveBroadcastItem}>
      <div className={styles.img}>
        <img src={data.picUrl} />
        <PlayCircleOutlined className={styles.icon} />
      </div>
      <span className={styles.name}>{data.name}</span>
    </Link>
  )
}

export default ExclusiveBroadcast
