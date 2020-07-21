/** @format */

import React, {useState, useEffect} from "react"
import SelectTag from "./components/Selecttag"
import {message, Card, Spin, Row, Col, Button} from "antd"
import LazyLoad from "react-lazyload"
import {UserOutlined} from "@ant-design/icons"
import {CLASSIFICATION, LANGUAGE, SELECT} from "@/help/map"
import API from "@/api"
import styles from "./index.scss"

let param = {
  type: -1,
  area: -1,
  initial: -1,
  limimt: 30,
  offset: 0
}
interface ArtistItemInterface {
  accountId?: number
  albumSize: number
  alias: any[]
  briefDesc: string
  followed: boolean
  id: number
  img1v1Id: number
  img1v1Id_str: string
  img1v1Url: string
  musicSize: number
  name: string
  picId: number
  picId_str: string
  picUrl: string
  topicPerson: number
  trans: string
}

const Singer = () => {
  const [data, setData] = useState<ArtistItemInterface[]>([])
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(false)
  const getData = async (params: any, type: number = 0) => {
    param = params
    setLoading(true)
    try {
      const Ret = await API.getArtistList(params)
      setLoading(false)
      if (Ret.code !== 200) message.info("稍后再试哦。。。")
      if (Ret.artists.length === 0) {
        message.info("已全部加载完毕")
        return setHasMore(false)
      }
      setHasMore(true)
      return type === 1 ? setData(data.concat(Ret.artists)) : setData(Ret.artists)
    } catch (error) {
      return setLoading(false)
    }
  }
  const getLanguage = (area: number) => {
    getData({...param, area, offset: 0})
  }
  const getClassification = (type: number) => {
    getData({...param, type, offset: 0})
  }
  const getSelect = (initial: any) => {
    getData({...param, initial, offset: 0})
  }
  const onLoadMore = () => {
    getData({...param, offset: param.offset + param.limimt}, 1)
  }
  useEffect(() => {
    getData({...param, loading: true})
  }, [])
  return (
    <div className={styles.singer}>
      <SelectTag data={LANGUAGE} getSelectTag={getLanguage} label="语种" />
      <SelectTag data={CLASSIFICATION} getSelectTag={getClassification} label="分类" />
      <SelectTag data={SELECT} getSelectTag={getSelect} label="分类" />
      <Row gutter={24}>
        {data.map((item) => (
          <Col span={4} className={styles.card} key={item.id}>
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
                {item?.accountId ? <UserOutlined className={styles.icon} /> : null}
              </p>
            </Card>
          </Col>
        ))}
      </Row>
      {!loading && hasMore && (
        <div className={styles.loadMore}>
          <Button loading={loading} type="primary" onClick={onLoadMore}>
            加载更多
          </Button>
        </div>
      )}
    </div>
  )
}

export default Singer
