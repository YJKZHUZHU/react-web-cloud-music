/** @format */

import React from "react"
import {Space, List, Avatar} from "antd"
import {RightOutlined} from "@ant-design/icons"
import {useRequest} from "ahooks"
import {history, Link} from "umi"
import API from "@/api"
import styles from "../index.scss"

interface IData {
  actId: number
  title: string
  text: string[]
  participateCount: number
  sharePicUrl: string
  reason: string
  isDefaultImg: boolean
  alg: string
}

interface IResp {
  code: number
  hot: IData[]
}

const HotTopic = () => {
  const {loading, data} = useRequest<IResp, any[], IData[], IData[]>(
    () => API.getHotTopic({limit: 8}),
    {
      formatResult: (response) => {
        if (response.code !== 200) {
          return []
        }
        return response.hot
      }
    }
  )
  const onLink = (id: number) => {
    history.push("/")
  }
  return (
    <Space direction="vertical" className={styles.hotTopic}>
      <Link to="/">
        <Space>
          <span>热门话题</span>
          <RightOutlined />
        </Space>
      </Link>
      <List
        locale={{
          emptyText: "暂无话题"
        }}
        loading={loading}
        itemLayout="horizontal"
        dataSource={data || []}
        renderItem={(item) => (
          <List.Item className={styles.item} onClick={() => onLink(item.actId)}>
            <List.Item.Meta
              className={styles.meta}
              avatar={<Avatar size="large" shape="square" src={item?.sharePicUrl} />}
              title={<span className={styles.title}>#{item?.title}#</span>}
              description={<span>{item?.participateCount}参与</span>}
            />
          </List.Item>
        )}
      />
    </Space>
  )
}

export default HotTopic
