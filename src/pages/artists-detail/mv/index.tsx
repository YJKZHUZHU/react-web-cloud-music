/** @format */

import React, {useEffect, FC} from "react"
import {Row, Col, Card, Spin, Space, Pagination} from "antd"
import {useHistory} from "umi"
import {useRequest} from "ahooks"
import {CaretRightOutlined} from "@ant-design/icons"
import {Iparams} from "../album"
import {IArtists} from "../similar-singer"
import {IProps} from "../_layout"
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

interface IMvProps extends IProps {
  total: number
}

const getData = ({id, pageSize, current}: Iparams): Promise<IResponse> =>
  API.getSingerMv({id, limit: pageSize, offset: current - 1})

const Mv: FC<IMvProps> = ({query, total}) => {
  const {id, name} = query
  const history = useHistory()
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
                    onClick={() => history.push(`/recommend/video/mvDetail?mvid=${item.id}`)}>
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
                  onClick={() => history.push(`/recommend/video/mvDetail?mvid=${item.id}`)}>
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
          showTotal={(total) => `共 ${total} 首mv`}
        />
      </Space>
    </Spin>
  )
}

export default Mv
