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
}

interface IExclusiveBroadcast {
  data: IExclusiveBroadcastItem
}

const ExclusiveBroadcast: FC<IExclusiveBroadcast> = ({data}) => {
  return (
    <Link
      to={`/recommend/video/mvdetail?mvid=${data.id}`}
      className={styles.exclusiveBroadcastItem}>
      <div className={styles.img}>
        <img src={data.picUrl} />
        <PlayCircleOutlined className={styles.icon} />
      </div>
      <span className={styles.name}>{data.name}</span>
    </Link>
  )
}

export default ExclusiveBroadcast
