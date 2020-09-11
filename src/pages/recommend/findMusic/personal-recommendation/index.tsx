/** @format */

import React, {useEffect} from "react"
import {Divider, Row, Col} from "antd"
import {RightOutlined} from "@ant-design/icons"
import {Link} from "umi"
import {useRequest} from "ahooks"
import CarouselImg from "../components/Carousel"
import RecommendedSongList, {IPersonalizedItem} from "@/components/RecommendedSongList"
import NewMusic, {INewSongItem} from "@/components/NewMusic"
import API from "@/api"
import styles from "./index.scss"

interface IPersonalizedData {
  category: number
  code: number
  hasTaste: boolean
  result: IPersonalizedItem[]
}

interface INewSong {
  result: INewSongItem[]
  category: number
  code: number
}

const PersonalRecommendation = () => {
  const {run: runPersonalized, data: personalizedData} = useRequest<IPersonalizedData>(
    () => API.personalized({limit: 12, loading: true}),
    {
      manual: true
    }
  )
  const {run: runNewSong, data: newSongData} = useRequest<INewSong>(API.newSong, {
    manual: true
  })

  useEffect(() => {
    runNewSong()
    runPersonalized()
  }, [])

  return (
    <>
      <CarouselImg />
      <div className={styles.recommend}>
        <div className={styles.top}>
          <h2>推荐歌单</h2>
          <Link to="/recommend/findmusic/song-list">
            <span>
              <i>更多</i>
              <RightOutlined />
            </span>
          </Link>
        </div>
        <Divider className={styles.divider} />
        <Row justify="start" gutter={24}>
          {personalizedData?.result.map((item) => {
            return (
              <Col span={4} key={item.id}>
                <RecommendedSongList data={item} />
              </Col>
            )
          })}
        </Row>
      </div>
      <div className={styles.recommend}>
        <div className={styles.top}>
          <h2>最新音乐</h2>
          <Link to="/recommend/findmusic/latest-music">
            <span>
              <i>更多</i>
              <RightOutlined />
            </span>
          </Link>
        </div>
        <Divider className={styles.divider} />
        <div className={styles.newMusic}>
          <Row>
            {newSongData?.result.map((item, index) => {
              return (
                <Col span={12} key={item.id} className={styles.item}>
                  <NewMusic data={item} index={index + 1} />
                </Col>
              )
            })}
          </Row>
        </div>
      </div>
    </>
  )
}

PersonalRecommendation.title = "个性推荐"

export default PersonalRecommendation
