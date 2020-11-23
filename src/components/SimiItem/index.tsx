/** @format */

import React, {FC} from "react"
import {Space} from "antd"
import {useHistory} from 'umi'
import PlayIcon from "@/components/PlayIcon"
import styles from "./index.scss"

export interface IData {
  path: string
  cover: string
  title: string
  content: React.ReactNode
  [key: string]: any
}

interface SimiItemProps {
  showPlayIcon?: boolean
  data: IData[]
}

const SimiItem: FC<SimiItemProps> = (props) => {
  const {showPlayIcon, data} = props
  const history = useHistory()
  console.log(data)
  return (
    <ul className={styles.simi}>
      {data.map((item) => {
        return (
          <li key={item.title} onClick={() => history.push(item.path)}>
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
  )
}

SimiItem.defaultProps = {
  showPlayIcon: false
}

export default SimiItem
