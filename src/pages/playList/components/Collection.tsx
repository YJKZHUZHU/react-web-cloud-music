/** @format */

import React, {FC, useEffect, useState} from "react"
import {UserOutlined} from "@ant-design/icons"
import {Col, Row, Avatar, Pagination, message, Spin} from "antd"
import {history} from "umi"
import API from "@/api"
import styles from "../index.scss"

interface CollectionProps {
  subscribedCount?: number
}

interface ItemInterface {
  userId: string | number
  avatarUrl: string
  nickname: string | number
}

interface ParamInterface {
  id: string | number
  limit?: number
  offset?: number
}
const Collection: FC<CollectionProps> = ({subscribedCount}) => {
  const {listId} = history.location.query
  const [loading, setLoading] = useState(false)
  const initParam = {
    id: listId,
    limit: 60,
    offset: 0
  }
  const [collectionList, setCollectionList] = useState([])
  const [current, setCurrent] = useState(1)

  const getList = async (params: ParamInterface) => {
    setLoading(true)
    try {
      const Ret = await API.playlistCollection(params)
      setLoading(false)
      if (Ret.code !== 200) return message.info("稍后再试...")
      return setCollectionList(Ret.subscribers)
    } catch (error) {
      setLoading(false)
      return message.info("稍后再试...")
    }
  }

  const onPage = (page: number) => {
    setCurrent(page)
    getList({
      id: listId,
      limit: 60,
      offset: (page - 1) * 60
    })
  }

  useEffect(() => {
    getList(initParam)
  }, [])

  return (
    <Spin spinning={loading} tip="Loading...">
      <div className={styles.collection}>
        <Row justify="start">
          {collectionList.map((item: ItemInterface) => {
            return (
              <Col span={3} key={item.userId}>
                <div className={styles.content}>
                  <p className={styles.img}>
                    <Avatar
                      style={{backgroundColor: "#D74D45"}}
                      icon={<UserOutlined />}
                      src={item.avatarUrl}
                    />
                  </p>
                  <p className={styles.name}>{item.nickname}</p>
                </div>
              </Col>
            )
          })}
        </Row>
        {collectionList.length !== 0 ? (
          <div className={styles.page}>
            <Pagination
              size="small"
              current={current}
              total={subscribedCount}
              showSizeChanger={false}
              onChange={onPage}
            />
          </div>
        ) : null}
      </div>
    </Spin>
  )
}

export default Collection
