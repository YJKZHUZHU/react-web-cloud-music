/** @format */

import React, {useState} from "react"
import classnames from "classnames"
import {Row, Col, Space, Spin, Pagination} from "antd"
import API from "@/api"
import SongListChoose from "./components/SongListChoose.tsx"
import CatCard from "./components/CatCard"
import styles from "./index.scss"

const classes = classnames(styles.songList, "catPopoverTag")

let param = {
  cat: "",
  order: false,
  limit: 50,
  offset: 0
}

const SongList = () => {
  const [data, setData] = useState<any[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [current, setCurrent] = useState(1)

  const getHighquality = async (params: any) => {
    setLoading(true)
    try {
      const Ret = await API.topPlaylist(params)
      setLoading(false)
      setData([])
      if (Ret.code !== 200 || Ret.playlists.length === 0) return
      setTotalCount(Ret.total)
      return setData(Ret.playlists)
    } catch (error) {
      setLoading(false)
      return error
    }
  }

  const onTag = (value: string, order: boolean) => {
    param = {...param, cat: value, order, offset: 0}
    getHighquality(param)
  }
  const onPage = (page: number) => {
    console.log(page)
    param = {...param, offset: (page - 1) * 50}
    setCurrent(page)
    getHighquality(param)
  }

  return (
    <Spin spinning={loading} tip="Loading...">
      <div className={classes}>
        <Space direction="vertical" size={20}>
          <SongListChoose getTag={onTag} />
          <Row gutter={24}>
            {data.map((item) => (
              <Col key={item.id} xxl={{span: 4}} xl={{span: 6}}>
                <CatCard data={item} loading={loading} />
              </Col>
            ))}
          </Row>
          <div className={styles.page}>
            <Pagination
              onChange={onPage}
              hideOnSinglePage
              showSizeChanger={false}
              size="small"
              current={current}
              total={totalCount}
            />
          </div>
        </Space>
      </div>
    </Spin>
  )
}

SongList.title = '歌单'

export default SongList
