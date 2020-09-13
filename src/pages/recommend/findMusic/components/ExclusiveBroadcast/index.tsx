/** @format */

import React, {FC} from "react"
import {PlayCircleOutlined} from "@ant-design/icons"
import {Link} from "umi"
import styles from './index.scss'

export interface IExclusiveBroadcastItem {
  id: 10956272
  url: ""
  picUrl: "https://p1.music.126.net/KOyCvFhNBD0NNLTXg417mw==/109951165302709606.jpg"
  sPicUrl: "https://p1.music.126.net/u0ga0_fwHhDumWCK-qA9BA==/109951165302702371.jpg"
  type: 5
  copywriter: "乘风飞翔EP6: 刘畅朗读威廉·巴特勒·叶芝《当你老了》"
  name: "乘风飞翔EP6: 刘畅朗读威廉·巴特勒·叶芝《当你老了》"
  alg: "featured"
}

interface IExclusiveBroadcast {
  data: IExclusiveBroadcastItem
}

const ExclusiveBroadcast: FC<IExclusiveBroadcast> = ({data}) => {
  return (
    <Link to="/" className={styles.exclusiveBroadcastItem}>
      <div className={styles.img}>
        <img src={data.picUrl} />
        <PlayCircleOutlined className={styles.icon} />
      </div>
      <span className={styles.name}>{data.name}</span>
    </Link>
  )
}

export default ExclusiveBroadcast
