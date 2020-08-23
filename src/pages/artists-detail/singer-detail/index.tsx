/** @format */

import React, {FC, useEffect} from "react"
import {useLocation} from "umi"
import {useRequest} from "ahooks"
import API from "@/api"
import {IProps} from "../_layout"
import styles from "./index.scss"

interface IOtherDesc {
  ti: string
  txt: string
}

const SingerDetail: FC<IProps> = ({query}) => {
  const {id, name} = query
  const {data, run} = useRequest(() => API.getArtistDesc({id}), {
    manual: true
  })
  useEffect(() => {
    run()
  }, [])
  return (
    <div className={styles.singerDetail}>
      <p className={styles.title}>{name}简介</p>
      <p className={styles.desc}>{data?.briefDesc}</p>
      {(data?.introduction as IOtherDesc[])?.map((item, index) => (
        <div key={index}>
          <p className={styles.title}>{item.ti}</p>
          <p className={styles.desc}>{item.txt}</p>
        </div>
      ))}
    </div>
  )
}

SingerDetail.title = "歌手详情"

export default SingerDetail
