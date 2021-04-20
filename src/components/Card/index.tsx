/** @format */

import React from "react"
import {Card, Space} from "antd"
import type {CardProps} from "antd"
import {CustomerServiceOutlined} from "@ant-design/icons"
import {PlayIcon} from "@/components"
import styles from "./index.scss"

const {Meta} = Card

interface ICard {
  title?: React.ReactNode
  description?:React.ReactNode
  width?: React.CSSProperties
}

const MusicCard = () => {
  return (
    <Card
      className={styles._card}
      bordered={false}
      style={{width: 240}}
      cover={
        <>
          <img
            className={styles.img}
            alt="example"
            src="https://p1.music.126.net/CUuTHskBVVxPWksK4xrbfg==/109951165787642330.jpg"
          />
          <Space className={styles.number}>
            <CustomerServiceOutlined />
            <i>0000</i>
          </Space>

          <div className={styles.descWrap}>huihuhug</div>
          <PlayIcon iconClassName={styles.playIcon} />
        </>
      }>
      <Meta title="巴适得板丨indie音乐场景·「成都乐队」t" description="www.instagram.com" />
    </Card>
  )
}

export default MusicCard
