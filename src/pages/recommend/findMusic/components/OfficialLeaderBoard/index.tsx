/** @format */

import React, {FC} from "react"
import {CaretRightOutlined, RightOutlined} from "@ant-design/icons"
import {Row, Col} from "antd"
import {Link, useDispatch} from "umi"
import moment from "moment"
import styles from "./index.scss"
import Utils from "@/help"

interface Tracks {
  id: string
  name: string
  ar: any[]
  alia: string[]
}

interface OfficialLeaderBoardItem {
  commentThreadId: number
  coverImgUrl: string
  name: string
  updateTime: number
  tracks: Tracks[]
}

interface OfficialLeaderBoardInterface {
  data: OfficialLeaderBoardItem[]
}

const OfficialLeaderBoard: FC<OfficialLeaderBoardInterface> = ({data}) => {
  const dispatch = useDispatch()

  return (
    <Row gutter={48}>
      {data.map((item) => {
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
              </div>
              <ul className={styles.list}>
                {item.tracks.slice(0, 8).map((items, index) => {
                  return (
                    <li
                      className={styles.item}
                      key={items.id}
                      onDoubleClick={() =>
                        dispatch({
                          type: "songInfoModel/getSongInfo",
                          payload: {
                            id: items.id
                          }
                        })
                      }>
                      <span
                        className={styles.number}
                        style={{
                          color: index === 0 || index === 1 || index === 2 ? "#CD2929" : "#666666"
                        }}>
                        {index + 1}
                      </span>
                      <span className={styles.title}>
                        {items.name}
                        {items.alia.map((title) => {
                          return (
                            <i key={title} style={{color: "#999999"}}>
                              {title}
                            </i>
                          )
                        })}
                      </span>
                      <span className={styles.name}>{Utils.formatName(items.ar)}</span>
                    </li>
                  )
                })}
              </ul>
              <p className={styles.link}>
                <Link to="/">
                  查看全部
                  <RightOutlined />
                </Link>
              </p>
            </div>
          </Col>
        )
      })}
    </Row>
  )
}

export default OfficialLeaderBoard
