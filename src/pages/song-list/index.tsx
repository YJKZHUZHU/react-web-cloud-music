/** @format */

import React, {useState} from "react"
import classnames from "classnames"
import {Row, Col, Space, Spin, Pagination, message} from "antd"
import {useRequest} from "ahooks"
import API from "@/api"
import SongListChoose from "./components/SongListChoose"
import CatCard from "./components/CatCard"
import styles from "./index.scss"

const classes = classnames(styles.songList, "catPopoverTag")

const SongList = () => {
  const [totalCount, setTotalCount] = useState(0)

  const {pagination, run, data, loading} = useRequest(
    ({current, pageSize}, params) =>
      API.topPlaylist({...params, offset: (current - 1) * pageSize, limit: pageSize}),
    {
      manual: true,
      paginated: true,
      defaultPageSize: 50,
      formatResult: (response) => {
        if (response.code !== 200 || response.playlists.length === 0) {
          message.error("歌单获取失败，稍后再试")
          return []
        }
        setTotalCount(response.total)
        return response.playlists
      }
    }
  )

  return (
      <div className={classes}>
        <Space direction="vertical" size={20}>
          <SongListChoose
            getTag={(value, order) => run({current: 1, pageSize: 50}, {cat: value, order})}
          />
          <Spin spinning={loading} tip="Loading...">
            <Row gutter={24}>
              {data?.map((item: any) => (
                <Col key={item.id} xxl={{span: 4}} xl={{span: 6}}>
                  <CatCard data={item} loading={loading} />
                </Col>
              ))}
            </Row>
          </Spin>

          <div className={styles.page}>
            <Pagination
              {...(pagination as any)}
              hideOnSinglePage
              showSizeChanger={false}
              size="small"
              total={totalCount}
            />
          </div>
        </Space>
      </div>
  )
}

SongList.title = "歌单"

export default SongList
