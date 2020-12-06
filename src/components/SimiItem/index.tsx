/** @format */

import React, {FC} from "react"
import {Space, Spin} from "antd"
import {useHistory, useDispatch} from "umi"
import {PlayIcon} from "@/components"
import styles from "./index.scss"

export interface IData {
  path?: string
  id?: string | number
  cover: string
  title: string
  content: React.ReactNode
  [key: string]: any
}

interface SimiItemProps {
  showPlayIcon?: boolean
  data: IData[]
  hidePlayer?: boolean
  loading?: boolean
}

const SimiItem: FC<SimiItemProps> = (props) => {
  const {showPlayIcon, data, hidePlayer, loading} = props
  const history = useHistory()
  const dispatch = useDispatch()
  const onLink = (item: any) => {
    if (hidePlayer) {
      history.push(item.path)
      dispatch({type: "playmodel/setShowPlayer", payload: {showPlayer: false}})
      return dispatch({
        type: "songInfoModel/setIsPlay",
        payload: {
          isPlay: false
        }
      })
    }
    return dispatch({
      type: "songInfoModel/getSongInfo",
      payload: {
        id: item.id
      }
    })
  }
  return (
    <Spin spinning={loading}>
      <ul className={styles.simi}>
        {data.map((item) => {
          return (
            <li key={item.title} onClick={() => onLink(item)}>
              <Space className={styles.item}>
                <div className={styles.img}>
                  <img src={item.cover} />
                  {showPlayIcon && <PlayIcon iconClassName={styles.playIcon} />}
                </div>
                <Space direction="vertical">
                  <span>{item.title}</span>
                  {item.content}
                </Space>
              </Space>
            </li>
          )
        })}
      </ul>
    </Spin>
  )
}

SimiItem.defaultProps = {
  showPlayIcon: false,
  hidePlayer: false
}

export default SimiItem
