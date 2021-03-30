/** @format */

import React, {useEffect, FC, useContext} from "react"
import {Row, Col, Card, Spin, Space, Pagination} from "antd"
import {useHistory, useLocation} from "umi"
import {useRequest} from "ahooks"
import {CaretRightOutlined} from "@ant-design/icons"
import {Iparams} from "../album"
import {IArtists} from "../similar-singer"
import {ArtistsDetailContext} from "../index"
import API from "@/api"
import Utils from "@/help"
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
interface Idata {
  mvs: IMv[]
}
interface IResponse {
  list: IMv[]
  total: number
}

const getData = ({id, pageSize, current}: Iparams): Promise<IResponse> =>
  API.getSingerMv({id, limit: pageSize, offset: current - 1})

const Mv = () => {
  const location: any = useLocation()
  const history = useHistory()
  const {id, name} = location?.query
  const {total} = useContext(ArtistsDetailContext)
  const {data, run, loading, pagination} = useRequest(
    ({current, pageSize}) => getData({id, current, pageSize}),
    {
      paginated: true,
      manual: true,
      defaultPageSize: 12,
      formatResult: ({mvs: list}: Idata): IResponse => ({
        list,
        total
      })
    }
  )
  useEffect(() => {
    run({current: 1, pageSize: 12})
  }, [name])
  if (!data?.list.length) return <div>没有相关mv</div>
  return (
    <Spin spinning={loading} tip="Loading...">
      <Space direction="vertical" size={20}>
        <Row gutter={24} className={styles.descContent}>
          {data?.list?.map((item) => (
            <Col span={4} className={styles.card} key={item.id}>
              <Card
                bordered={false}
                bodyStyle={{padding: 0}}
                loading={loading}
                cover={
                  <div
                    className={styles.singerCover}
                    onClick={() => history.push(`/mv-detail?mvid=${item.id}`)}>
                    <img alt={item.name} src={item.imgurl} />
                    <span className={styles.time}>
                      {Utils.formatPlayerTime(item.duration / 1000)}
                    </span>
                    <div className={styles.playCount}>
                      <CaretRightOutlined />
                      {Utils.tranNumber(item.playCount, 0)}
                    </div>
                  </div>
                }>
                <p
                  className={styles.name}
                  onClick={() => history.push(`/mv-detail?mvid=${item.id}`)}>
                  <span className={styles.singerName}>{item.name}</span>
                </p>
              </Card>
            </Col>
          ))}
        </Row>
        <Pagination
          {...(pagination as any)}
          size="small"
          showSizeChanger
          showQuickJumper
          showTotal={(total) => (
            <Space>
              <span>共</span>
              <span>{total}</span>
              <span>首mv</span>
            </Space>
          )}
        />
      </Space>
    </Spin>
  )
}

export default Mv
