/** @format */

import React, {FC} from "react"
import {CaretRightOutlined, RightOutlined} from "@ant-design/icons"
import {Col} from "antd"
import {Link, useDispatch, useHistory} from "umi"
import moment from "moment"
import classnames from "classnames"
import {Artists} from "@/components"
import styles from "./index.scss"

interface IAr {
  id: number
  name: string
  tns: any[]
  alias: [any]
}

interface ITracks {
  id: string
  name: string
  ar: IAr[]
  alia: string[]
}

interface ITrackIds {
  id: number
  v: number
  at: number
  alg: any
  lr: number
}

interface IPlayListItem {
  subscribers: any[]
  subscribed: boolean
  creator: {[key: string]: any}
  tracks: ITracks[]
  trackIds: ITrackIds[]
  updateFrequency: any
  backgroundCoverId: number
  backgroundCoverUrl: any
  titleImage: number
  titleImageUrl: any
  englishTitle: any
  opRecommend: boolean
  adType: number
  trackNumberUpdateTime: number
  subscribedCount: number
  cloudTrackCount: number
  userId: number
  createTime: number
  highQuality: boolean
  specialType: number
  updateTime: number
  coverImgId: number
  newImported: boolean
  commentThreadId: string
  coverImgUrl: string
  privacy: number
  trackUpdateTime: number
  trackCount: number
  playCount: number
  ordered: boolean
  description: string
  tags: string[]
  status: number
  name: string
  id: number
  shareCount: number
  coverImgId_str: string
  ToplistType?: string
  commentCount: number
}

interface OfficialLeaderBoardInterface {
  data: IPlayListItem[]
  type: "officia" | "singer"
}
interface ISingerItem {
  name: string
  id: number
  picId: number
  img1v1Id: number
  briefDesc: string
  picUrl: string
  img1v1Url: string
  albumSize: number
  alias: any[]
  trans: string
  musicSize: number
  topicPerson: number
  lastRank: number
  score: number
  picId_str: string
  img1v1Id_str: string
}

export interface ISingetTopList {
  code: 200
  list: {
    artists: ISingerItem[]
    updateTime: number
  }
}

const OfficialLeaderBoard: FC<OfficialLeaderBoardInterface> = ({data, type}) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const onPlay = (id: string) => {
    if (type === "officia") {
      return dispatch({
        type: "songInfoModel/getSongInfo",
        payload: {
          id
        }
      })
    }
  }
  const onLink = (id: string, name: string) => {
    if (type === "singer") {
      history.push(`/artists-detail/album?id=${id}&name=${name}`)
    }
  }
  return (
    <>
      {data?.map((item) => {
        return (
          <Col span={8} key={item.commentThreadId}>
            <div className={styles._leaderBoard}>
              <div className={styles.top}>
                <div className={styles.img}>
                  <img src={item.coverImgUrl} className={styles.img} />
                </div>
                <div className={styles.description}>
                  <span>{item.name}</span>
                  <span>最近更新：{moment(item.updateTime).format("MM-DD")}日更新</span>
                </div>
                {type === "officia" ? (
                  <div className={styles.icon}>
                    <CaretRightOutlined
                      onClick={() =>
                        dispatch({
                          type: "songInfoModel/getSongInfo",
                          payload: {
                            id: item.tracks[0].id
                          }
                        })
                      }
                    />
                  </div>
                ) : null}
              </div>
              <ul className={styles.list}>
                {item.tracks.slice(0, 8).map((items, index) => {
                  return (
                    <li
                      className={styles.item}
                      key={items.id}
                      onClick={() => onLink(items.id, items.name)}
                      onDoubleClick={() => onPlay(items.id)}>
                      <span
                        className={styles.number}
                        style={{
                          color: index === 0 || index === 1 || index === 2 ? "#CD2929" : "#666666"
                        }}>
                        {index + 1}
                      </span>
                      <span
                        className={classnames(styles.title, {[styles.diff]: type === "singer"})}>
                        {items.name}
                        {items.alia &&
                          items.alia.map((title) => {
                            return (
                              <i key={title} style={{color: "#999999"}}>
                                {title}
                              </i>
                            )
                          })}
                      </span>
                      <Artists data={items.ar} />
                    </li>
                  )
                })}
              </ul>
              <p className={styles.link}>
                <Link to={type === "officia" ? `/playList/${item.id}?listId=${item.id}` : "/singer-list"}>
                  查看全部
                  <RightOutlined />
                </Link>
              </p>
            </div>
          </Col>
        )
      })}
    </>
  )
}

export default OfficialLeaderBoard
