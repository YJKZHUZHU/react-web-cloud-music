/** @format */

import React, {useEffect} from "react"
import {Spin, Tabs, Row, Col} from "antd"
import {VideoCameraOutlined} from "@ant-design/icons"
import {useRequest} from "ahooks"
import {history} from "@umijs/max"
import {Artists} from "@/components"
import Utils from "@/help"
import API from "@/api"
import styles from "./index.scss"

const {TabPane} = Tabs

interface ICreator {
  userId: number
  userName: string
}
interface IMvItem {
  type: number
  title: string
  durationms: number
  creator: ICreator[]
  playTime: number
  coverUrl: string
  vid: string
  aliaName: null | string
  transName: null | string
  alg: null | string
  markTypes: any[]
}

interface IData {
  data: IMvItem[]
  hasMore: boolean
  count: number
  code: number
}

export default () => {
  const {data, run, loading} = useRequest<IData>(API.mvSublist, {
    manual: true
  })

  const creator = (list: ICreator[]) => {
    return list.map((item) => {
      return {
        id: item.userId,
        name: item.userName
      }
    })
  }
  useEffect(() => {
    run()
  }, [])
  return (
    // <TabPane tab={`MV ${data?.code}`} key="mv">
    <Spin spinning={loading} tip="LOading...">
      <>
        {data?.data.length === 0 ? (
          <Row>
            <Col span={24}>暂无收藏MV</Col>
          </Row>
        ) : (
          <Row gutter={32}>
            {data?.data.map((item) => {
              return (
                <Col span={6} key={item.vid}>
                  <div className={styles.mvItem}>
                    <div
                      className={styles.img}
                      onClick={() => history.push(`/mv-detail?mvid=${item.vid}&type=${item.type}`)}>
                      <img src={item.coverUrl} alt={item.coverUrl} />
                      <p className={styles.player}>
                        <VideoCameraOutlined />
                        <span>{Utils.tranNumber(item.playTime, 2)}</span>
                      </p>
                      <p className={styles.time}>
                        {Utils.formatPlayerTime(item.durationms / 1000)}
                      </p>
                    </div>

                    <p className={styles.title}>
                      {item.type === 0 ? <span className={styles.tag}>MV</span> : null}
                      <span>{item.title}</span>
                    </p>
                    {item.type === 0 ? (
                      <Artists data={creator(item.creator)} />
                    ) : (
                      <p>
                        by
                        {item.creator.map((items, index) => {
                          return (
                            <span
                              className={styles.singer}
                              onClick={() => history.push(`/homepage?uid=${items.userId}`)}>
                              {items.userName}
                              {item.creator.length !== index + 1 ? "/" : null}
                            </span>
                          )
                        })}
                      </p>
                    )}
                  </div>
                </Col>
              )
            })}
          </Row>
        )}
      </>
    </Spin>
    // </TabPane>
  )
}
