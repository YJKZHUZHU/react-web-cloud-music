/** @format */

import React, {useEffect} from "react"
import {Spin} from "antd"
import {useLocation} from "@umijs/max"
import {useRequest} from "ahooks"
import API from "@/api"
import styles from "./index.scss"

interface IOtherDesc {
  ti: string
  txt: string
}

const SingerDetail = () => {
  const location: any = useLocation()
  const {id, name} = location?.query
  const {data, run, loading} = useRequest(() => API.getArtistDesc({id}), {
    manual: true
  })
  useEffect(() => {
    run()
  }, [name])
  return (
    <Spin spinning={loading} tip="歌手简介加载中...">
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
    </Spin>
  )
}


export default SingerDetail
