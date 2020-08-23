/** @format */

import React, {useEffect, FC} from "react"
import {Row, Col, Card, Spin} from "antd"
import {useHistory} from "umi"
import {useRequest} from "ahooks"
import {CaretRightOutlined} from "@ant-design/icons"
import {IArtists} from "../similar-singer"
import {IProps} from "../_layout"
import API from "@/api"
import Utils from '@/help'
import styles from "./index.scss"

interface IMv {
  id: number
  name: string
  status: number
  artist: IArtists
  imgurl16v9: string
  imgurl: string
  artistName: string
  duration: number
  playCount: number
  publishTime: string
  subed: boolean
}

const Mv: FC<IProps> = ({query}) => {
  const {id} = query
  const {data, run, loading} = useRequest(() => API.getSingerMv({id}), {
    manual: true
  })
  const history = useHistory()
  console.log(data)
  useEffect(() => {
    run()
  }, [])
  return (
    <Spin spinning={loading} tip="LOading...">
      <Row gutter={24}>
        {(data?.mvs as IMv[])?.map((item) => (
          <Col
            span={4}
            className={styles.card}
            key={item.id}
            onClick={() => history.push(`/artists-detail/album?id=${id}&name=${item.name}`)}>
            <Card
              bordered={false}
              bodyStyle={{padding: 0}}
              loading={loading}
              cover={
                <div className={styles.singerCover}>
                  <img alt={item.name} src={item.imgurl} />
                  <span className={styles.time}>
                    {Utils.formatPlayerTime(item.duration / 1000)}
                  </span>
                  <div className={styles.playCount}>
                    <CaretRightOutlined />
                    {item.playCount}
                  </div>
                </div>
              }>
              <p className={styles.name}>
                <span className={styles.singerName}>{item.name}</span>
              </p>
            </Card>
          </Col>
        ))}
      </Row>
    </Spin>
  )
}

export default Mv
