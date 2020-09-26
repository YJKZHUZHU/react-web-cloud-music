/** @format */

import React, {FC, useState, useEffect, useCallback} from "react"
import {Tabs, Spin, Tag, message, Row, Col} from "antd"
import {useHistory, matchPath} from "umi"
import {useRequest, useThrottle, useThrottleFn} from "ahooks"
import InfiniteScroll from "react-infinite-scroller"
import moment from "moment"
import PlayIcon from "@/components/PlayIcon"
import API from "@/api"
import styles from "../index.scss"
import Artists from "@/components/Artists"

const {TabPane} = Tabs
const {CheckableTag} = Tag

const TAB_MAP = [
  {
    name: "全部",
    key: "ALL"
  },
  {
    name: "华语",
    key: "ZH"
  },
  {
    name: "欧美",
    key: "EA"
  },
  {
    name: "韩国",
    key: "KR"
  },
  {
    name: "日本",
    key: "JP"
  }
]

interface IList {
  area: string
  tip: string
  type: string
}
interface IArtists {
  img1v1Id: number
  topicPerson: number
  followed: false
  alias: string[]
  picId: number
  musicSize: number
  albumSize: number
  img1v1Url: string
  picUrl: string
  trans: string
  briefDesc: string
  name: string
  id: number
  picId_str: string
  img1v1Id_str: string
}
interface IData {
  songs: any[]
  paid: boolean
  onSale: boolean
  description: string
  alias: any[]
  picId: number
  artist: IArtists
  tags: string
  company: string
  blurPicUrl: string
  companyId: number
  pic: number
  artists: IArtists[]
  copyrightId: number
  status: number
  subType: string
  publishTime: number
  picUrl: string
  briefDesc: string
  commentThreadId: string
  name: string
  id: number
  type: string
  size: number
  picId_str: string
  isSub: boolean
}
interface IRet {
  hasMore: boolean
  monthData: IData[]
  code: number
}
const tagsData = [
  {
    tag: "热门",
    key: "hot"
  },
  {
    tag: "全部",
    key: "new"
  }
]
const List: FC<IList> = ({tip, area, type}) => {
  const [list, setList] = useState<IData[]>([])
  const [page, setPage] = useState({
    offset: 0,
    limit: 30
  })
  const [day, setDay] = useState({
    year: moment().format("YYYY"),
    month: moment().format("MM")
  })

  const [loading, setLoading] = useState(false)
  const [more, setMore] = useState(true)
  const history = useHistory()

  const getList = async () => {
    console.log("进来")
    let monthIndex = 0
    let yearIndex = 0
    setLoading(true)
    let params = {...page, ...day, area, type}
    if (!more) {
      setLoading(false)
      setMore(false)
      monthIndex--
      let month = moment().add(monthIndex, "M").format("MM")
      if (month === "00") {
        yearIndex--
      }
      let year = moment().add(yearIndex, "y").format("YYYY")
      setDay({
        month,
        year
      })
      params = {
        ...params,
        month,
        year
      }
    }
    try {
      const Ret: IRet = await API.getTopAlbum(params)
      setLoading(false)
      if (Ret.monthData.length !== 0) {
        setList(list.concat(Ret.monthData))
      }
      setPage({
        ...page,
        // offset: 10000
        offset: page.offset + page.limit
      })
      // if(!Ret.hasMore)
      setMore(Ret.hasMore)
    } catch (error) {
      setLoading(false)
    }
  }

  const loadMore = () => {
    getList()
  }

  useEffect(() => {
    setList([])
  }, [type])

  useEffect(() => {
    getList()
  }, [type])
  console.log(loading, more)
  return (
    <div className={styles.newDiscItem}>
      <InfiniteScroll
        initialLoad={false}
        pageStart={0}
        loadMore={loadMore}
        hasMore={!loading && more}
        useWindow={false}>
        <div className={styles.layout}>
          <div className={styles.time}>
            <div className={styles.fixed}>
              <span className={styles.month}>{day.month}</span>
              <span className={styles.year}>{day.year}</span>
            </div>
          </div>
          <Row gutter={16} style={{paddingRight: 20}}>
            {list.map((item) => {
              return (
                <Col span={4} key={item.id} onClick={() => history.push(`/album?id=${item.id}`)}>
                  <div className={styles.img}>
                    <PlayIcon iconClassName={styles.playIcon} />
                    <img src={item.picUrl} />
                  </div>
                  <div className={styles.content}>
                    <span className={styles.name}>{item.name}</span>
                    <Artists data={item.artists} />
                  </div>
                </Col>
              )
            })}
          </Row>
        </div>

        {loading && (
          <div className={styles.loading}>
            <Spin spinning={loading} tip={`${tip}新碟加载中。。。`} />
          </div>
        )}
      </InfiniteScroll>
    </div>
  )
}
const NewDisc = () => {
  const [active, setActive] = useState("ALL")
  const [checked, setChecked] = useState("hot")
  const extra = (
    <>
      {tagsData.map((tag) => (
        <CheckableTag
          key={tag.key}
          checked={tag.key === checked}
          onChange={() => setChecked(tag.key)}>
          {tag.tag}
        </CheckableTag>
      ))}
    </>
  )
  return (
    <Tabs onChange={(value) => setActive(value)} activeKey={active} tabBarExtraContent={extra}>
      {TAB_MAP.map((item) => {
        return (
          <TabPane tab={item.name} key={item.key}>
            <List area={item.key} tip={item.name} type={checked} />
          </TabPane>
        )
      })}
    </Tabs>
  )
}

export default NewDisc
