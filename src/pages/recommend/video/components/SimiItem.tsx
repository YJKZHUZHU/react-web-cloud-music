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
  vid: string
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
  creator: any
  alg: string
  coverUrl: string
  playTime: number
  title: string
  durationms: number
}

const SimiDetail = () => {
  const location: any = useLocation()

  const {query} = location
  const mvBool = +query.type === 0

  const onMv = (mvid: number) => {
    history.push({
      pathname: "/recommend/video/mvDetail",
      query: {mvid, type: query.type}
    })
  }
  const {data} = useRequest(
    () => (+query.type === 0 ? API.getSimi({...query}) : API.getRelateVedio({id: query.mvid})),
    {
      formatResult: (response): ISimiInterface[] => {
        return mvBool ? response.mvs : response.data
      }
    }
  )
  return (
    <>
      {data?.map((item) => {
        return (
          <div
            key={item.id}
            className={styles.simiItem}
            onClick={() => onMv(+query.type === 0 ? item.id : item.vid)}>
            <div className={styles.left}>
              <img src={mvBool ? item.cover : item?.coverUrl} />
              <span className={styles.playCount}>
                <CaretRightOutlined />
                {mvBool
                  ? Utils.tranNumber(item?.playCount, 2)
                  : Utils.tranNumber(item?.playTime, 2)}
              </span>
              <span className={styles.time}>
                {mvBool
                  ? Utils.formatPlayerTime(item.duration / 1000)
                  : Utils.formatPlayerTime(item.durationms / 1000)}
              </span>
            </div>
            <p className={styles.right}>
              {mvBool ? item.name : item.title}-
              {mvBool
                ? Utils.formatName(item.artists)
                : Utils.formatName(item?.creator, "/", "userName")}
            </p>
          </div>
        )
      })}
    </>
  )
}
export default SimiDetail
