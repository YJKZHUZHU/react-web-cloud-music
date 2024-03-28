/** @format */

import React, {useState, useRef, FC} from "react"
import {Space, Tooltip, Tag, Divider, Row, Col, Spin} from "antd"
import {
  QuestionCircleOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  MinusOutlined
} from "@ant-design/icons"
import {history} from "@umijs/max"
import {useRequest} from "ahooks"
import dayjs from "dayjs"
import {PlayIcon, Artists} from "@/components"
import API from "@/api"
import {MV_AREA} from "@/help/map"
import styles from "./index.scss"

const {CheckableTag} = Tag

const areaData = MV_AREA.filter((item) => item.id !== "全部")

interface IData {
  id: number
  cover: string
  name: string
  playCount: number
  briefDesc: any
  desc: any
  artistName: string
  artistId: number
  duration: number
  mark: number
  mv: {[key: string]: any}
  lastRank: number
  score: number
  subed: boolean
  artists: any[]
}

interface IIconProps {
  rank: number
}

const Icon: FC<IIconProps> = ({rank}) => {
  if (rank > 0) return <ArrowUpOutlined className={styles.up} />
  if (rank < 0) return <ArrowDownOutlined className={styles.down} />
  return <MinusOutlined />
}

const TopMv = () => {
  const [selectTag, setSelectTag] = useState(["内地"])
  const areaRef = useRef("内地")
  const onChecked = (id: string, checked: boolean) => {
    if (checked) {
      setSelectTag([id])
      areaRef.current = id
    }
  }
  const {data, loading} = useRequest(() => API.getTopMv({area: areaRef.current, limit: 50}), {
    refreshDeps: selectTag
  })
  return (
    <div className={styles.topMv}>
      <div className={styles.top}>
        <Space>
          <span>最近更新：</span>
          <Tooltip
            placement="topLeft"
            title="选取云音乐中三个月内发布的热度最高的50支mv，每天更新，热度有由mv播放，收藏，分享数量综合计算">
            <Space size={4}>
              <span>{dayjs(data?.updateTime).format("YYYY-MM-DD HH:MM:ss")}</span>
              <QuestionCircleOutlined />
            </Space>
          </Tooltip>
        </Space>
        <ul className={styles.right}>
          {areaData.map((item, index) => (
            <li key={item.id}>
              <CheckableTag
                key={item.id}
                checked={selectTag.indexOf(item.id) > -1}
                onChange={(checked) => onChecked(item.id, checked)}>
                {item.value}
              </CheckableTag>
              {index !== areaData.length - 1 ? <Divider type="vertical" /> : null}
            </li>
          ))}
        </ul>
      </div>
      <Spin spinning={loading} tip="Loading...">
        <Row gutter={32} className={styles.list}>
          {data?.data.map((item: IData, index: number) => {
            return (
              <Col span={12} key={item.id}>
                <Space className={styles.item} size={12}>
                  <div className={styles.left}>
                    <span className={styles.number}>{index + 1}</span>
                    <Icon rank={item.lastRank - index} />
                  </div>
                  <div
                    className={styles.img}
                    onClick={() => history.push(`/mv-detail?mvid=${item.id}&type=0`)}>
                    <img src={item?.cover} alt={item.name} />
                    <Space className={styles.score}>
                      <span>热度</span>
                      <span>{item.score}</span>
                    </Space>
                    <PlayIcon iconClassName={styles.playIcon} />
                  </div>
                  <div className={styles.content}>
                    <p
                      className={styles.name}
                      onClick={() => history.push(`/mv-detail?mvid=${item.id}&type=0`)}>
                      {item.name}
                    </p>
                    <p>
                      <Artists data={item.artists} />
                    </p>
                  </div>
                </Space>
              </Col>
            )
          })}
        </Row>
      </Spin>
    </div>
  )
}

export default TopMv
