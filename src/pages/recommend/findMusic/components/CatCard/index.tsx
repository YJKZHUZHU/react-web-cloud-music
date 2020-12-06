/** @format */

import React, {FC} from "react"
import {Card, Space} from "antd"
import {PlayCircleOutlined, UserOutlined} from "@ant-design/icons"
import {history} from "umi"
import {PlayIcon} from "@/components"
import Utils from "@/help"
import styles from "./index.scss"

interface CatProps {
  data: any
  loading: boolean
}

const onLink = (listId: number) => {
  history.push({
    pathname: "/playList",
    query: {
      listId
    }
  })
}
const CatCard: FC<CatProps> = ({data, loading}) => {
  const onUser = (e: any) => {
    e.stopPropagation()
  }
  const cover = (
    <div className={styles.item}>
      <img alt={data.coverImgUrl} src={data.coverImgUrl} />
      <div className={styles.playCount}>
        <Space size={4}>
          <PlayCircleOutlined />
          <span>{Utils.tranNumber(data.playCount, 0)}</span>
        </Space>
      </div>
      <div className={styles.nickname} onClick={onUser}>
        <Space size={4}>
          <UserOutlined />
          <span className={styles.name}>{data.creator.nickname}</span>
        </Space>
      </div>
      <PlayIcon iconClassName={styles.playIcon} />
    </div>
  )
  return (
    <div className={styles.catCard} onClick={() => onLink(data.id)}>
      <Card bordered={false} bodyStyle={{padding: 0}} loading={loading} cover={cover}>
        <p className={styles.name}>{data.name}</p>
      </Card>
    </div>
  )
}

export default CatCard
