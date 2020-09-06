/** @format */

import React, {useEffect} from "react"
import Utils from "@/help"
import {CaretRightOutlined} from "@ant-design/icons"
import {history, useLocation} from "umi"
import {useRequest} from "ahooks"
import API from "@/api"
import styles from "../index.scss"

export interface ISimiInterface {
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

const SimiDetail = () => {
  const location: any = useLocation()
  const onMv = (mvid: number) => {
    history.push({
      pathname: "/recommend/video/mvDetail",
      query: {mvid}
    })
  }
  const {data, run} = useRequest(() => API.getSimi({...location.query}), {
    manual: true,
    formatResult: (response): ISimiInterface[] => {
      return response.mvs
    }
  })

  useEffect(() => {
    run()
  }, [])
  return (
    <>
      {data?.map((item) => {
        return (
          <div key={item.id} className={styles.simiItem} onClick={() => onMv(item.id)}>
            <div className={styles.left}>
              <img src={item.cover} />
              <span className={styles.playCount}>
                <CaretRightOutlined />
                {Utils.tranNumber(item.playCount, 2)}
              </span>
              <span className={styles.time}>{Utils.formatPlayerTime(item.duration / 1000)}</span>
            </div>
            <p className={styles.right}>
              {item.name}-{Utils.formatName(item.artists)}
            </p>
          </div>
        )
      })}
    </>
  )
}
export default SimiDetail
