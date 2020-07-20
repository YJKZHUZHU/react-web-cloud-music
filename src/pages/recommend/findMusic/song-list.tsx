/** @format */

import React, {useState} from "react"
import classnames from "classnames"
import {Row, Col, Space, Spin} from "antd"
import API from "@/api"
import SongListChoose from "./components/SongListChoose.tsx"
import CatCard from "./components/CatCard"
import styles from "./index.scss"

const classes = classnames(styles.songList, "catPopoverTag")

const SongList = () => {
  const [data, setData] = useState<any[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const getHighquality = async (cat: string, order: boolean = true) => {
    setLoading(true)
    try {
      const Ret = await API.topPlaylist({limit: 50, cat, order})
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
    getHighquality(value, order)
  }

  return (
    <Spin spinning={loading} tip="Loading...">
      <div className={classes}>
        <Space direction="vertical" size={20}>
          <SongListChoose getTag={onTag} />
          <Row gutter={24}>
            {data.map((item) => (
              <Col key={item.id} xxl={{span: 4}} xl={{span: 6}}>
                <CatCard data={item} />
              </Col>
            ))}
          </Row>
        </Space>
      </div>
    </Spin>
  )
}

export default SongList
