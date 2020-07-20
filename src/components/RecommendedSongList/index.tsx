/** @format */

import React, {FC, Fragment, useEffect, useState} from "react"
import {CustomerServiceOutlined, PlaySquareOutlined} from "@ant-design/icons"
import {Link} from "umi"
import PlayIcon from "@/components/PlayIcon"
import Utils from "@/help/index"

import styles from "./index.scss"

type Props = {
  data?: any
}

interface DataInterface {
  picUrl: string
  copywriter: string
  playCount: number
  name: string
  id: any
}

const RecommendedSongList: FC<Props> = ({data}) => {
  return (
    <Link to={`/playList?listId=${data.id}`}>
      <div className={styles._list}>
        <div className={styles.imgWrap}>
          <img src={data.picUrl} />
          <span className={styles.number}>
            <CustomerServiceOutlined className={styles.listen} />
            <i>{Utils.tranNumber(data.playCount, 2)}</i>
          </span>
          <div className={styles.descWrap}>
            <span className={styles.desc}>{data.copywriter}</span>
          </div>
          <PlayIcon iconClassName={styles.playIcon} />
        </div>
        <p className={styles.name}>{data.name}</p>
      </div>
    </Link>
  )
}

export default RecommendedSongList
