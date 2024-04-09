/** @format */

import React, { FC } from "react"
import { PlayCircleOutlined } from "@ant-design/icons"
import { history } from "@umijs/max"
import styles from "./index.scss"
import classNames from "classnames"

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

const ExclusiveBroadcast: FC<IExclusiveBroadcast> = ({ data }) => {
  const onLink = (item: IExclusiveBroadcastItem) => {
    let result = ""
    if (+item.type === 5) {
      result = `/mv-detail?mvid=${item.id}&type=0`
    }
    if (+item.type === 24) {
      result = `/mv-detail?mvid=${item.videoId}&type=1`
    }
    return history.push(result)
  }
  return (
    <div onClick={() => onLink(data)} className={classNames(styles.exclusiveBroadcastItem, 'flex', 'gap-[16px]')}>
      <div className={styles.img}>
        <img src={data.picUrl} />
        <PlayCircleOutlined className={styles.icon} />
      </div>
      <p className="flex-1 line-clamp-2 leading-[20px]">{data.name}</p>
    </div>
  )
}

export default ExclusiveBroadcast
