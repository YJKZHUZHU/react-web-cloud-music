/** @format */

import React, {FC, useState, useRef} from "react"
import {Tabs, Tag, Row, Col} from "antd"
import {useHistory} from "umi"
import {useRequest, useUpdateEffect} from "ahooks"
import {LoadingOutlined} from "@ant-design/icons"
import moment, {Moment} from "moment"
import {PlayIcon, Artists} from "@/components"
import {NEW_DISK_TAB_MAP} from "@/help/map"
import API from "@/api"
import styles from "../index.scss"
import Utils from "@/help"

const {TabPane} = Tabs
const {CheckableTag} = Tag

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

const List: FC<IList> = (props) => {
  const {tip, area, type} = props
  const history = useHistory()
  const containerRef = useRef<HTMLDivElement>(null)
  const dateRef = useRef<Moment>(moment())
  const {data, reload, noMore} = useRequest(
    (result: {list: IData[]; more: any}) =>
      API.getTopAlbum({
        tip,
        area,
        type,
        limit: 30,
        year: dateRef.current.format("YYYY"),
        month: dateRef.current.format("MM"),
        offset: result?.list.length || 0
      }),
    {
      loadMore: true,
      ref: containerRef,
      isNoMore: (d) => {
        return !d?.more
      },
      formatResult: (response) => {
        let more = response.hasMore || false
        if (!response.hasMore) {
          dateRef.current.add(-1, "M")
          more = true
        }
        return {
          list: response.monthData || [],
          more
        }
      }
    }
  )

  useUpdateEffect(() => {
    reload()
  }, [type])

  return (
    <div className={styles.newDiscItem} ref={containerRef}>
      <div className={styles.layout}>
        <div className={styles.time}>
          <div className={styles.fixed}>
            <span className={styles.month}>{dateRef.current.format("MM")}</span>
            <span className={styles.year}>{dateRef.current.format("YYYY")}</span>
          </div>
        </div>
        <Row gutter={16} style={{paddingRight: 20}}>
          {data?.list.map((item) => {
            return (
              <Col
                span={4}
                key={Utils.createRandomId()}
                onClick={() => history.push(`/album?id=${item.id}`)}>
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

      <div className={styles.loading}>
        {noMore ? (
          "加载完了哦..."
        ) : (
          <span>
            Loading
            <LoadingOutlined />
          </span>
        )}
      </div>
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
      {NEW_DISK_TAB_MAP.map((item) => {
        return (
          <TabPane tab={item.name} key={item.key}>
            <List area={item.key} tip={item.name} type={checked} />
          </TabPane>
        )
      })}
    </Tabs>
  )
}
NewDisc.title = "最新音乐"
export default NewDisc
