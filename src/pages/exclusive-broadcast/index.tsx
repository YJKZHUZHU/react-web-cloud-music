/** @format */

import React, {useEffect, useState} from "react"
import {Row, Col, Spin, message} from "antd"
import InfiniteScroll from "react-infinite-scroller"
import {useHistory} from "umi"
import PlayIcon from "@/components/PlayIcon"
import API from "@/api"
import styles from "./index.scss"

interface IList {
  id: number
  url: string
  picUrl: string
  sPicUrl: string
  type: number
  copywriter: string
  name: string
  time: number
  videoId: number
}

interface IData {
  code: number
  result: IList[]
  more: boolean
  offset: number
}
const ExclusiveBroadcast = () => {
  const [list, setList] = useState<IList[]>([])
  const [page, setPage] = useState({
    offset: 0,
    limit: 60
  })
  const [loading, setLoading] = useState(false)
  const [more, setMore] = useState(false)
  const history = useHistory()

  const getList = async () => {
    try {
      const Ret: IData = await API.getExclusiveBroadcastList(page)
      setLoading(false)
      if (Ret.result.length !== 0) {
        setList(list.concat(Ret.result))
      }
      setPage({
        ...page,
        offset: page.offset + page.limit
      })
      setMore(Ret.more)
    } catch (error) {
      setLoading(false)
    }
  }

  const loadMore = () => {
    setLoading(true)
    if (!more) {
      return message.warning("加载完了哦。。。")
    }
    getList()
  }

  const onLink = (item: IList) => {
    if (+item.type === 5) {
      return history.push(`/recommend/video/mvdetail?mvid=${item.id}&type=0`)
    }
    if (+item.type === 24) {
      return history.push(`/recommend/video/mvdetail?mvid=${item.videoId}&type=1`)
    }
    return message.info('该视频暂时无法播放哦')
  }

  useEffect(() => {
    getList()
  }, [])

  return (
    <div className={styles.exclusiveBroadcast}>
      <InfiniteScroll
        initialLoad={false}
        pageStart={1}
        loadMore={loadMore}
        hasMore={!loading && more}
        useWindow={false}>
        <Row gutter={32}>
          {list.map((item) => {
            return (
              <Col span={6} key={item.picUrl} onClick={() => onLink(item)}>
                <div className={styles.img}>
                  <PlayIcon iconClassName={styles.playIcon} />
                  <img src={item.sPicUrl} />
                </div>
                <span className={styles.name}>{item.name}</span>
              </Col>
            )
          })}
        </Row>
        {loading && more && (
          <div className={styles.loading}>
            <Spin spinning={loading} tip="Loading..." />
          </div>
        )}
      </InfiniteScroll>
    </div>
  )
}
ExclusiveBroadcast.title = "独家放送"

export default ExclusiveBroadcast
