/** @format */

import React, {useEffect, FC} from "react"
import {Row, Col, Card, Spin} from "antd"
import {useHistory} from "umi"
import {useRequest} from "ahooks"
import {IProps} from "../_layout"
import API from "@/api"
import styles from "./index.scss"

export interface IArtists {
  img1v1Id: number
  topicPerson: number
  musicSize: number
  albumSize: number
  briefDesc: string
  followed: boolean
  img1v1Url: string
  trans: string
  alias: any[]
  picId: number
  picUrl: string
  name: string
  id: number
  accountId: number
  alg: string
}

const SimilarSinger: FC<IProps> = ({query}) => {
  const {id} = query
  const {data, run, loading} = useRequest(() => API.getSimilarSinger({id}), {
    manual: true
  })
  const history = useHistory()
  useEffect(() => {
    run()
  }, [])
  return (
    <Spin spinning={loading} tip="Loading...">
      <Row gutter={24} className={styles.descContent}>
        {(data?.artists as IArtists[])?.map((item) => (
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
                  <img alt={item.name} src={item.picUrl} />
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

export default SimilarSinger
