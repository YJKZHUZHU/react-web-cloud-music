/** @format */

import React, {FC} from "react"
import {PlayCircleOutlined} from "@ant-design/icons"
import {Link} from "umi"
import Artists from "@/components/Artists"
import Utils from "@/help/index"
import styles from "./index.scss"

interface IArtists {
  id: number
  name: string
}

export interface IRecommendItem {
  id: number
  type: number
  name: string
  copywriter: string
  picUrl: string
  canDislike: boolean
  trackNumberUpdateTime: null | number
  duration: number
  playCount: number
  subed: boolean
  artists: IArtists[]
  artistName: string
  artistId: number
  alg: string
}

interface IRecommendMv {
  data: IRecommendItem
}

const RecommendMv: FC<IRecommendMv> = ({data}) => {
  return (
    <Link to={`/recommend/video/mvdetail?mvid=${data.id}&type=${data.type}`}>
      <div className={styles._list}>
        <div className={styles.imgWrap}>
          <img src={data.picUrl} />
          <span className={styles.number}>
            <PlayCircleOutlined className={styles.listen} />
            <i>{Utils.tranNumber(data.playCount, 2)}</i>
          </span>
          <div className={styles.descWrap}>
            <span className={styles.desc}>{data.copywriter}</span>
          </div>
        </div>
        <p className={styles.name}>{data.name}</p>
        <Artists data={data.artists} />
      </div>
    </Link>
  )
}

export default RecommendMv
