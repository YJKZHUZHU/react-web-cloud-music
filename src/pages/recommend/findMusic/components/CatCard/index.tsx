/** @format */

import React, {FC} from "react"
import {Card, Space} from "antd"
import {PlayCircleOutlined, UserOutlined} from "@ant-design/icons"
import PlayIcon from "@/components/PlayIcon"
import Utils from "@/help"
import styles from "./index.scss"

interface CatProps {
  data: any
}

const CatCard: FC<CatProps> = ({data}) => {
  return (
    <div className={styles.catCard}>
      <Card
        bordered={false}
        bodyStyle={{padding: 0}}
        cover={<img alt={data.coverImgUrl} src={data.coverImgUrl} />}>
        <p className={styles.name}>{data.name}</p>
      </Card>
      <div className={styles.playCount}>
        <Space size={4}>
          <PlayCircleOutlined />
          <span>{Utils.tranNumber(data.playCount, 0)}</span>
        </Space>
      </div>
      <div className={styles.nickname}>
        <Space size={4}>
          <UserOutlined />
          <span className={styles.name}>{data.creator.nickname}</span>
        </Space>
      </div>
      <PlayIcon iconClassName={styles.playIcon} />
    </div>
  )
}

export default CatCard
