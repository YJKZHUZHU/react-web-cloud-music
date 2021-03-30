/** @format */

import React, {FC, useEffect} from "react"
import {useRequest} from "ahooks"
import {Spin, Row, Col, Space} from "antd"
import {useHistory} from "umi"
import API from "@/api"
import styles from "../index.scss"

interface IList {
  type: 1 | 2 | 3 | 4
}
interface IArtists {
  name: string
  id: number
  picId: number
  img1v1Id: number
  briefDesc: string
  picUrl: string
  img1v1Url: string
  albumSize: number
  alias: any[]
  trans: string
  musicSize: number
  topicPerson: number
  lastRank: number
  score: number
  picId_str: string
  img1v1Id_str: string
}
interface ISingerItem {
  artists: IArtists[]
  updateTime: number
  type: number
}
interface IData {
  code: number
  list: ISingerItem
}

function formatRank(lastRank: number, index: number) {
  if (lastRank === index) return "- 0"
  if (lastRank < index) {
    return (
      <span>
        <i style={{color: "#2C77CA"}}>↓</i>
        {index - lastRank}
      </span>
    )
  }
  if (lastRank > index) {
    return (
      <span>
        <i style={{color: "#CD2929"}}>↑</i>
        {lastRank - index}
      </span>
    )
  }
}
const List: FC<IList> = ({type}) => {
  const history = useHistory()
  const {data, loading, run} = useRequest<IData>(() => API.getSingerTopList({type}), {
    manual: true
  })

  const onLink = (id: number, name: string) =>
    history.push(`/artists-detail/album?id=${id}&name=${name}`)

  useEffect(() => {
    run()
  }, [])

  return (
    <div className={styles.singerList}>
      <Spin spinning={loading} tip="Loading...">
        <Row gutter={32}>
          {data?.list.artists.slice(0, 3).map((item) => {
            return (
              <Col span={8} onClick={() => onLink(item.id, item.name)}>
                <div className={styles.topItem}>
                  <div className={styles.topNumber}>
                    <div className={styles.trangle}></div>
                    <span className={styles.number}>{item.lastRank + 1}</span>
                  </div>
                  <div className={styles.content}>
                    <Space direction="vertical">
                      <span>{item.name}</span>
                      <Space className={styles.number}>
                        <span>热度</span>
                        <span>{item.score}</span>
                      </Space>
                    </Space>
                  </div>
                  <div className={styles.img}>
                    <img src={item.img1v1Url} alt={item.name} />
                  </div>
                </div>
              </Col>
            )
          })}
        </Row>
        <ul className={styles.lastList}>
          {data?.list.artists.slice(2, data?.list.artists.length).map((item, index) => {
            return (
              <li className={styles.item}>
                <Space className={styles.left} size={15}>
                  <div className={styles.rank}>
                    <span className={styles.number}>{index + 3}</span>
                    <span className={styles.range}>{formatRank(item.lastRank, index + 2)}</span>
                  </div>

                  <div className={styles.img}>
                    <img src={item.img1v1Url} />
                  </div>
                  <span className={styles.name} onClick={() => onLink(item.id, item.name)}>
                    {item.name}
                  </span>
                </Space>
                <Space>
                  <span>热度</span>
                  <span>{item.score}</span>
                </Space>
              </li>
            )
          })}
        </ul>
      </Spin>
    </div>
  )
}
export default List
