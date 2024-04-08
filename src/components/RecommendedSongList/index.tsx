/** @format */

import React, { FC } from "react"
import { CustomerServiceOutlined } from "@ant-design/icons"
import { Link, history } from "@umijs/max"
import { PlayIcon } from "@/components"
import Utils from "@/help/index"
import styles from "./index.scss"

export interface IPersonalizedItem {
  alg: string
  canDislike: boolean
  copywriter: string
  highQuality: boolean
  id: number
  name: string
  picUrl: string
  playCount: number
  trackCount: number
  trackNumberUpdateTime: number
  type: number
}

type Props = {
  data: IPersonalizedItem
}


const RecommendedSongList: FC<Props> = ({ data }) => {
  return (
    <div onClick={() => history.push(`/playList/${data.id}?listId=${data.id}`)} className={styles._list}>
      <div className={styles.imgWrap}>
        <img src={data.picUrl} />
        <span className={styles.number}>
          <CustomerServiceOutlined />
          <i>{Utils.tranNumber(data.playCount, 2)}</i>
        </span>
        {
          data.copywriter && <div className={styles.descWrap}>
            <span className={styles.desc}>{data.copywriter}</span>
          </div>
        }

        <PlayIcon iconClassName={styles.playIcon} />
      </div>
      <p className=" text-[#7D829E] px-[8px] line-clamp-2 mt-[12px] mb-[12px] text-[14px] leading-[16px]">{data.name}</p>
    </div>
  )
}

export default RecommendedSongList
