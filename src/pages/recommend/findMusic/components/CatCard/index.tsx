/** @format */

import React, {FC} from "react"
import {Card} from "antd"
import {UserOutlined} from "@ant-design/icons"
import styles from "./index.scss"

interface CatProps {
  data: any
}

const CatCard: FC<CatProps> = ({data}) => {
  console.log(data)
  return (
    <Card
      bordered={false}
      bodyStyle={{padding: 0}}
      cover={<img alt={data.coverImgUrl} src={data.coverImgUrl} />}>
      <p className={styles.name}>
        <span className={styles.singerName}>{data.copywriter}</span>
      </p>
    </Card>
  )
}

export default CatCard
