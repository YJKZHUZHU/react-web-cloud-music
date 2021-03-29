/** @format */

import React, {FC} from "react"
import {Row, Col, Space, Spin} from "antd"
import {CaretRightOutlined, PlayCircleFilled, PlayCircleTwoTone} from "@ant-design/icons"
import {useHistory} from "umi"
import {PlayIcon} from "@/components"
import Utils from "@/help"
import styles from "../index.scss"

interface ICardProps {
  data: any[]
  loading: boolean
}

const Card: FC<ICardProps> = ({data, loading}) => {
  const history = useHistory()
  const onLink = (e: React.MouseEvent<HTMLElement>, id: string) => {
    e.stopPropagation()
    history.push(`/homePage?id=${id}`)
  }
  return (
    <Spin spinning={loading} tip="视频加载中。。。">
      <Row gutter={32} className={styles.vedioList}>
        {data?.map((item) => {
          if (!item?.data?.coverUrl) return null
          return (
            <Col
              span={6}
              className={styles.item}
              onClick={() => history.push(`/mv-detail?mvid=${item?.data?.vid}&type=${item?.type}`)}>
              <div className={styles.img}>
                <img src={item?.data?.coverUrl} />
                <span className={styles.durationms}>
                  {Utils.formatPlayerTime(item?.data?.durationms / 1000)}
                </span>
                <Space size={4} className={styles.playTime}>
                  <CaretRightOutlined />
                  <span>{Utils.tranNumber(item?.data?.playTime, 10)}</span>
                </Space>
                <PlayIcon iconClassName={styles.icon} />
              </div>
              <p className={styles.title}>{item?.data?.title}</p>
              <Space>
                <span>by</span>
                <span onClick={(e) => onLink(e, item?.data?.creator?.userId)}>
                  {item?.data?.creator?.nickname}
                </span>
              </Space>
            </Col>
          )
        })}
      </Row>
    </Spin>
  )
}

export default Card
