/** @format */

import React, {FC} from "react"
import {Space} from "antd"
import {HeartOutlined} from "@ant-design/icons"
import Utils from "@/help"
import {Artists} from "@/components"
import styles from "./index.scss"

interface IAr {
  id: number
  name: string
  alia: string[]
}
interface IAl {
  id: number
  name: string
  picUrl: string
  pic_str: string
  pic: number
  alia: string[]
}
interface ISongs {
  name: string
  alia: string[]
  ar: IAr[]
  al: IAl
  dt: number
  id: number
  [key: string]: any
}

interface IList {
  list: ISongs[]
}

const List: FC<IList> = ({list}) => {
  return (
    <>
      <div className={styles.head}>
        <div className={styles.space}></div>
        <div className={styles.title}>音乐标题</div>
        <div className={styles.singer}>歌手</div>
        <div className={styles.album}>专辑</div>
        <div className={styles.time}>时长</div>
      </div>
      <ul className={styles.list}>
        {list?.map((item, index) => {
          return (
            <li key={item.id}>
              <div className={styles.space}>
                <Space>
                  <span>{index < 9 ? `0${index + 1}` : index + 1}</span>
                  <HeartOutlined />
                </Space>
              </div>
              <div className={styles.title}>
                {item.name}
                {item.alia.length !== 0 ? `(${item.alia.join()})` : null}
              </div>
              <div className={styles.singer}>
                <Artists data={item.ar} />
              </div>
              <div className={styles.album}>{item.al.name}</div>
              <div className={styles.time}>{Utils.formatPlayerTime(item.dt / 1000)}</div>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default List
